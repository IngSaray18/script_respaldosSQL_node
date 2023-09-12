const express = require('express');
const cors = require('cors');
const app = express();

// Habilitar CORS para todas las solicitudes
app.use(cors());

// Importar las rutas
const backupRoute = require('./routes/backup');
const ejecutarRoute = require('./routes/ejecutar'); 
 
// Usar las rutas en la aplicación Express
app.use('/backup', backupRoute);
app.use('/ejecutar', ejecutarRoute);

const port = 4000;

app.listen(port, () => {
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});
