const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema({
    nickname: String,
    carnet: Number,
    telefono: String,
    email: { type: String, required: true }, // Nuestro ID
    fecha: String,
    hora: String
}, {
    // Esto evita que Mongoose añada un campo __v (versión) que no necesitamos en Android
    versionKey: false 
});

module.exports = mongoose.model('Reserva', ReservaSchema);