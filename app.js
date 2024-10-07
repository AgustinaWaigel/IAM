const express = require('express');
const app = express();
const mysql = require('mysql');
const multer = require('multer');

// Configura el almacenamiento de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Conectar a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'tu_usuario',
    password: 'tu_contraseña',
    database: 'blog'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rutas (aquí puedes añadir las rutas para tus páginas)
app.get('/', (req, res) => {
    res.send('Bienvenido a mi blog');
});

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
