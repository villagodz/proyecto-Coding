// backend/controllers/authController.js
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Registro de usuario
export const register = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    const newUser = new User({ firstName, lastName, username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(400).json({ message: 'Error en el registro', error });
  }
};

export const login = async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne( { email } );
      if(!user){ //VEMOS SI EXISTE EL USUARIO
          res.status(400).json({
              errors: { //SI NO EXISTE MANDAMOS EL ERROR
                  email: { 
                      message: "Usuario no encontrado"
                  }
              }
          });
          return;
      }

      const passwordMatch = await bcrypt.compare(password, user.password); //VEMOS SI CONTRASEÑAS COINCIDEN
      if(!passwordMatch){// SI NO COINCIDEN
          res.status(401).json({
              errors: {
                  password: {
                      message: "Las contraseñas no coinciden!" //MANDAMOS EL ERROR
                  }
              }
          });
          return;
      }

      //AHORA GENERAMOS EL TOKEN DE AUROTIZACION
      const token = jwt.sign(
          { 
              id: user._id,
          }, 
          process.env.JWT_SECRET, 
          { 
              expiresIn: "15m" 
          })

      res.status(200)
          .cookie("userToken", token, { httpOnly: true }) //ENVIAMOS EL TOKEN EN UNA COOKIE Y NOS ASEGURAMOS QUE SEA HTTPONLY PARA SEGURIDAD 
          .json({ token })
  } catch (error) {   
      res.status(500).json(error)
  }
}

export const logout = async (req, res) => {
  res.status(200).clearCookie("userToken").json({});
};

export const session = async (req, res) => {
  res.status(200).json(req.user);
};

