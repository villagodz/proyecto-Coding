import { model, Schema } from 'mongoose';

const productosSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del restaurante es obligatorio."],
        minLength: [3, "El nombre del restaurante debe ser mayor a 3 caracteres."],
        unique: [true, "El nombre del restaurante debe ser unico."]
    },
    descripcion: {
        type: String,
        required: [true, "La descipcion del producto es obligatorio."],
        minLength: [10, "La descripcion del producto debe ser mayor a 10 caracteres."],

    },
    costo: {
        type: Number,
        required: [true, "El costo es obligatorio."], 
    }
})

// Crea el modelo de User
const Producto = model("Producto", productosSchema);

export default Producto;
export { productosSchema };

