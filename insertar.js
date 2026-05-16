const mongoose = require('mongoose');
require('dotenv').config();
const Reserva = require('./models/Reserva');

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(async () => {
        console.log('✅ Conectado a MongoDB.');

        try {
            // 1. ESTO BORRA LA COLECCIÓN ANTIGUA Y SUS REGLAS ESTRICTAS
            await mongoose.connection.collection('reservas').drop().catch(() => console.log('Colección limpia.'));
            console.log('🧹 Base de datos reseteada. Insertando datos...');

            // Reserva PASADA
            const reservaPasada = new Reserva({
                nickname: "Jorge Pasado",
                carnet: 111111,
                telefono: "600111222",
                email: "jorge.boliblandi@alum.uca.es",
                fecha: "10/05/2026", 
                hora: "10:30"
            });

            // Reserva PENDIENTE
            const reservaPendiente = new Reserva({
                nickname: "Jorge Futuro",
                carnet: 999999,
                telefono: "600999888",
                email: "jorge.boliblandi@alum.uca.es",
                fecha: "25/05/2026", 
                hora: "18:00"
            });

            await reservaPasada.save();
            await reservaPendiente.save();

            console.log('🎉 ¡Las 2 reservas se han insertado correctamente!');
            process.exit(0);

        } catch (error) {
            console.error('❌ Error al insertar:', error);
            process.exit(1);
        }
    })
    .catch((error) => {
        console.error('❌ Error de conexión:', error);
        process.exit(1);
    });