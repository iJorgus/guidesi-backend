const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
    nickname: String,
    carnet: Number,
    telefono: String,
    email: { type: String, required: true },
    fecha: String,
    hora: String,
    guia: String // <-- NUEVO CAMPO AGREGADO
}, {
    versionKey: false 
});

module.exports = mongoose.model('Reserva', reservaSchema);