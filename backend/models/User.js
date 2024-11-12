import { model, Schema } from 'mongoose';
import customValidations from '../utils/customValidations.js';
import bcrypt from 'bcrypt'

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: 
          { 
            type: String, 
            unique: [true, "El usuario debe ser unico."],
            required: [true, "El usuario es obligatorio."] 
          },
  email: 
        { 
          type: String,
          unique: [true, "Ya existe un usuario/a con ese email."],
          trim: true,
          lowecase: true,
          required: [true, "El email es obligatorio."],
          validate: [customValidations.validateEmail, "Ingrese un email valido."] 
        },
  password: 
        {
          type: String,
          required: [true, "¡El password es obligatorio!"],
          minLength: [6, "El password no puede ser menor a 6 carateres"],
        },
},{ timestamps: true });

//VALIDACIONES DE CONTRASEÑA Y CONFIRMACIÓN DE CONTRASEÑA
userSchema.virtual('confirmPassword')
    .get(function () {
        return this._confirmPassword;
    })
    .set(function (value) {
        this._confirmPassword = value;
    });


userSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', '¡Las contraseñas no coinciden!');
    }
    next();
});

//ENCRYPTACIÓN DE CONTRASEÑA
userSchema.pre('save', function (next) {
  //Si la contraseña es modificada, la encriptamos
  if (this.isModified('password')) {
      try {
          const salt = bcrypt.genSaltSync(10);    //Genera un salt para encriptar la contraseña
          const hash = bcrypt.hashSync(this.password, salt); //Encripta la contraseña
          this.password = hash;   //Asigna la contraseña encriptada al campo password
          next(); //Continua con el proceso
      } catch (error) {
          next(error);    //Si hay un error, lo enviamos al siguiente middleware
      }
  }
  else {
      next(); //Si no hay cambios en la contraseña, continuamos con el proceso
  }
});

// Crea el modelo de User
const User = model("User", userSchema);

// Exporta el modelo para usarlo en tu aplicación
export default User;