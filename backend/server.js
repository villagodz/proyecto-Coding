// backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnect from './config/db.js';
import cookieParser from 'cookie-parser';
//Importaciones de rutas
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import restaurantesRoutes from './routes/restaurantesRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT 

//CONFIGURACIONES
app.use(express.json());

app.use(cors(
    {
        origin: 'http://localhost:5173'
    }
));

app.use(cookieParser());
//USO DE RUTAS  
//Rutas tareas
app.use("/api/restaurantes", restaurantesRoutes);
//Rutas de usuarios
app.use("/api/users", userRoutes);   
//Rutas de sesiones
app.use("/api/auth", authRoutes);    

dbConnect();

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));