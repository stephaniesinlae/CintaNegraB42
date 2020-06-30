const mongoose = require("mongoose");

// 1) Crear una base de datos para un supermercado que pueda 
// almacenar lo siguiente:
// - Artículo
//     -Nombre (string)
//     -Precio (number)
//     -Existencias (number)


const productSchema = mongoose.Schema({
name: {
    type: String,
    required: true,
},
price: {
    type: Number,
    required: true,
},
stock:{
    type: Number,
    default: 25, 
},
});

const Products = mongoose.model(`Products`, productSchema);

module.exports = Products;