const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('conexion.js'); // Importa la conexión a la base de datos

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Obtener todos los productos
app.get('/productos1', (req, res) => {
    db.query('SELECT * FROM productos1', (err, results) => {
        if (err) {
            console.error('Error al obtener productos:', err.message);
            return res.status(500).send('Error al obtener productos');
        }
        res.json(results);
    });
});

// Agregar un nuevo producto
app.post('/productos1', (req, res) => {
    const { img, name, price } = req.body;
    db.query(
        'INSERT INTO productos1 (img, name, price) VALUES (?, ?, ?)',
        [img, name, price],
        (err) => {
            if (err) {
                console.error('Error al agregar producto:', err.message);
                return res.status(500).send('Error al agregar producto');
            }
            res.send('Producto agregado con éxito');
        }
    );
});

// Modificar un producto
app.put('/productos1/:id', (req, res) => {
    const { id } = req.params;
    const { img, name, price } = req.body;
    db.query(
        'UPDATE productos1 SET img = ?, name = ?, price = ? WHERE id = ?',
        [img, name, price, id],
        (err) => {
            if (err) {
                console.error('Error al modificar producto:', err.message);
                return res.status(500).send('Error al modificar producto');
            }
            res.send('Producto modificado con éxito');
        }
    );
});

// Eliminar un producto
app.delete('/productos1/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM productos1 WHERE id = ?', [id], (err) => {
        if (err) {
            console.error('Error al eliminar producto:', err.message);
            return res.status(500).send('Error al eliminar producto');
        }
        res.send('Producto eliminado con éxito');
    });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
