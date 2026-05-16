// 1. SOLUCIÓN DE DNS (Vital para Vodafone/Orange en España con MongoDB Atlas)
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 

const app = express();

app.use(cors()); 
app.use(express.json()); 

const reservaRoutes = require('./routes/reservaRoutes');
app.use('/', reservaRoutes);

// 2. CONEXIÓN A MONGODB
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.warn("⚠️ ADVERTENCIA: No se encontró la variable MONGO_URI.");
} else {
    mongoose.connect(mongoURI)
        .then(() => console.log('✅ Conectado exitosamente a MongoDB'))
        .catch((error) => console.error('❌ Error al conectar a MongoDB:', error));
}

// 3. PUERTO Y ARRANQUE
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo y escuchando en el puerto ${PORT}`);
});