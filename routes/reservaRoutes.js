const express = require('express');
const router = express.Router();
const Reserva = require('../models/Reserva'); // Importamos el modelo que acabamos de crear

// 1. GET: Obtener TODAS las reservas (Para la lista en Jetpack Compose)
router.get('/reservas', async (req, res) => {
    try {
        const reservas = await Reserva.find();
        res.json(reservas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las reservas", error });
    }
});

// 2. GET: Buscar UNA reserva por Email (Para tu función buscarPorEmail en el ViewModel)
router.get('/reservas/:email', async (req, res) => {
    try {
        const reserva = await Reserva.findOne({ email: req.params.email });
        if (!reserva) return res.status(404).json({ message: "Reserva no encontrada" });
        res.json(reserva);
    } catch (error) {
        res.status(500).json({ message: "Error al buscar la reserva", error });
    }
});

// 3. POST: Crear una NUEVA reserva (Para tu pantalla CrearReserva)
router.post('/reservas', async (req, res) => {
    try {
        const nuevaReserva = new Reserva(req.body);
        await nuevaReserva.save();
        res.status(201).json(nuevaReserva);
    } catch (error) {
        // Si el email ya existe, MongoDB lanza el error 11000
        if (error.code === 11000) {
            return res.status(400).json({ message: "Ya existe una reserva con este email." });
        }
        res.status(500).json({ message: "Error al crear la reserva", error });
    }
});

// 4. DELETE: Eliminar una reserva por su _id de MongoDB
router.delete('/reservas/:id', async (req, res) => {
    try {
        const reservaEliminada = await Reserva.findByIdAndDelete(req.params.id);
        if (!reservaEliminada) return res.status(404).json({ message: "Reserva no encontrada para eliminar" });
        res.json({ message: "Reserva eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la reserva", error });
    }
});

// 5. PUT: Actualizar una reserva por su _id de MongoDB
router.put('/reservas/:id', async (req, res) => {
    try {
        const reservaActualizada = await Reserva.findByIdAndUpdate(
            req.params.id, 
            req.body,      
            { new: true }  
        );

        if (!reservaActualizada) {
            return res.status(404).json({ message: "Reserva no encontrada para actualizar" });
        }

        res.json(reservaActualizada);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la reserva", error });
    }
});

module.exports = router;