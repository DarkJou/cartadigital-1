const express = require('express');
const db = require('conexion.js'); // Tu conexión a la base de datos
const app = express();

app.use(express.json()); // Permite manejar JSON en las solicitudes

// Ruta para obtener productos
app.get('/productos1', (req, res) => {
    db.query('SELECT * FROM productos1', (err, results) => {
        if (err) {
            console.error('Error al obtener productos:', err);
            res.status(500).send('Error al obtener productos.');
        } else {
            res.json(results); // Enviar productos como respuesta
        }
    });
});

// Ruta para agregar un producto
app.post('/productos1', (req, res) => {
    const { img, name, price } = req.body;
    const query = 'INSERT INTO productos1 (img, name, price) VALUES (?, ?, ?)';
    db.query(query, [img, name, price], (err, results) => {
        if (err) {
            console.error('Error al agregar producto:', err);
            res.status(500).send('Error al agregar producto.');
        } else {
            res.status(201).send('Producto agregado correctamente.');
        }
    });
});

// Ruta para modificar un producto
app.put('/productos1/:id', (req, res) => {
    const { id } = req.params;
    const { img, name, price } = req.body;
    const query = 'UPDATE productos1 SET img = ?, name = ?, price = ? WHERE id = ?';
    db.query(query, [img, name, price, id], (err, results) => {
        if (err) {
            console.error('Error al modificar producto:', err);
            res.status(500).send('Error al modificar producto.');
        } else {
            res.send('Producto modificado correctamente.');
        }
    });
});

// Ruta para eliminar un producto
app.delete('/productos1/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM productos1 WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar producto:', err);
            res.status(500).send('Error al eliminar producto.');
        } else {
            res.send('Producto eliminado correctamente.');
        }
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
