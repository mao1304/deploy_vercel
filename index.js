const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Variables para almacenar datos
let storedNumber = null;
let storedTitle = null;

// Rutas
app.post('/numbers', (req, res) => {
    const { number, title } = req.body;

    if (typeof number !== 'number') {
        return res.status(400).json({ error: 'El campo "number" debe ser un número.' });
    }

    storedNumber = number;
    storedTitle = title;
    res.status(201).json({ message: 'Número almacenado correctamente.' });
});

app.get('/numbers', (req, res) => {
    if (storedNumber === null) {
        return res.status(404).json({ error: 'No hay ningún número almacenado.' });
    }

    res.status(200).json({ number: storedNumber, title: storedTitle });
});

// Exporta el app para que Vercel lo maneje
module.exports = app;
