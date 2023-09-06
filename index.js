const express = require('express');
const sql = require('mssql');
const moment = require('moment');
const { exec } = require('child_process');
const cors = require('cors');


const app = express();
// Configurar el tiempo de espera (timeout) en milisegundos

// Habilitar CORS para todas las solicitudes
app.use(cors());
// Configuración de conexión a la base de datos
const dbConfig = {
  user: 'CajaAhorro',
  password: 'CajaAhorro',
  server: '192.168.2.20',
  options: {
    encrypt: true,
    trustServerCertificate: true, // Para conexiones seguras
    requestTimeout: 120000
  },
};

const BBDD = 'VentanillaWeb' 

// Ruta para realizar un respaldo de la base de datos
app.get('/backup-database', async (req, res) => {
  try {
    // Conectar a la base de datos
    await sql.connect(dbConfig);
    console.log('Conexión exitosa');

    // Obtener la fecha actual en formato "yyyymmdd"
    const currentDate = moment().format('YYYYMMDD');

    // T-SQL para realizar un respaldo de la base de datos
    const backupScript = `
      BACKUP DATABASE ${BBDD}
      TO DISK = 'G:/RespaldosProduccion/Respaldo${BBDD}${currentDate}.bak'
      WITH FORMAT, MEDIANAME = 'BD_SeguirdadBackup', NAME = 'BD_Seguridad-Full Database Backup';
    `;

    // Ejecutar el script de respaldo
    const result = await sql.query(backupScript);
    // Cerrar la conexión
    await sql.close();
    console.log('Conexión cerrada');

    res.json({ message: 'Respaldo de base de datos exitoso', filename: `${BBDD}${currentDate}.bak` });
  } catch (error) {
    console.error('Error al conectar o realizar el respaldo:', RequestError);
    res.status(500).json({ error: 'Error al realizar el respaldo de la base de datos' });
  }
});

app.get('/ejecutar-code', (req, res) => {
  // Ejecuta el comando "code" (puede variar según tu sistema operativo)
  exec('firefox', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al ejecutar el comando "code": ${error}`);
      return res.status(500).send('Error interno del servidor');
    }
    
    console.log(`Comando "code" ejecutado con éxito: ${stdout}`);
    return res.send('Comando "code" ejecutado con éxito ' + stdout );
  });
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});
