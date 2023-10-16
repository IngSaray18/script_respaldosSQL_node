const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
 

//conecxion a base de datos
// URL de conexión a la base de datos MongoDB
const url = 'mongodb://localhost:27017'; // Cambia esto según tu configuración


// Habilitar CORS para todas las solicitudes
app.use(cors());

// Importar las rutas
const backupRoute = require('./routes/backup');
const ejecutarRoute = require('./routes/ejecutar'); 
 
// Usar las rutas en la aplicación Express
app.use('/backup', backupRoute);
app.use('/ejecutar', ejecutarRoute);

const port = 3000;

app.listen(port, () => {
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});
