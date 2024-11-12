import { model, Schema } from 'mongoose';
import { productosSchema } from './Productos.models.js';

const restauranteSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del restaurante es obligatorio."],
        minLength: [3, "El nombre del restaurante debe ser mayor a 3 caracteres."],
        unique: [true, "El nombre del restaurante debe ser unico."]
    },
    productos: [productosSchema],
    valoracion: {
        type: Number,
        required: [true, "Debe ingresar la valoracion."],
    },
    categoria: {
        type: String,
        enum: ['restaurante', 'mercado', 'heladeria', 'bodega']
    },
    urlImg: {
        type: String,
        required: [true, "Debe proporcionar una URL de una imagen!"],
        validate: {
            validator: function (value) {
                // Expresión regular para verificar si la URL termina con una extensión válida de imagen
                return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(value);
            },
            message: "La URL de la imagen debe terminar con una extensión válida (.jpg, .jpeg, .png, etc)."
        }
    },
}, { timestamps: true })

// Crea el modelo de User
const Restaurante = model("Restaurante", restauranteSchema);

// Exporta el modelo para usarlo en tu aplicación
export default Restaurante;