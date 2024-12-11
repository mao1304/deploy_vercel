const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON en el cuerpo de las solicitudes
app.use(express.json());

// Variables para almacenar datos (puedes usar una base de datos para persistencia real)
let storedNumber = null;
let storedTitle = null;

// Ruta para guardar un número
app.post('/numbers', (req, res) => {
    const { number, title } = req.body; // Desestructuración correcta

    // Validar que se envíe un número
    if (typeof number !== 'number') {
        return res.status(400).json({ error: 'El campo "number" debe ser un número.' });
    }

    storedNumber = number; // Guardar el número en memoria
    storedTitle = title;   // Guardar el título en memoria
    res.status(201).json({ message: 'Número almacenado correctamente.' });
});

// Ruta para consultar el número almacenado
app.get('/numbers', (req, res) => {
    if (storedNumber === null) {
        return res.status(404).json({ error: 'No hay ningún número almacenado.' });
    }

    res.status(200).json({ number: storedNumber, title: storedTitle });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
