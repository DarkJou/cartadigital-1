const mysql = require('mysql2');

// Crear conexión a la base de datos
const connection = mysql.createConnection({
    host: 'server-pagina1.mysql.database.azure.com',
    user: 'administrador',
    password: 'Darkjou19',
    database: 'carta_virtual'
});

// Probar conexión
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.message);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

module.exports = connection;
