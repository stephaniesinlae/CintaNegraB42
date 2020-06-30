const mongoose = require("mongoose");
const Products = require("./Products");
// - Ticket
//     -subtotal (number)
//     -IVA (number)
//     -total (number)
//     -articulos (articulo)

const ticketSchema = mongoose.Schema({
    subtotal: {
        type: Number,
        defautl: 0,
    },
    iva: {
        type: Number,
        default: 0.12, 
    },
    total:{
        type: Number,
        defautl: 0,
    },
    articulos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
    }],
    });
    
    const Tickets = mongoose.model(`Tickets`, ticketSchema);
    
    module.exports = Tickets;