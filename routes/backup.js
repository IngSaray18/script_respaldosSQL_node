const express = require('express');
const sql = require('mssql');
const moment = require('moment');

const router = express.Router();

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

const BBDD = 'VentanillaWeb';

router.get('/backup-database', async (req, res) => {
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
    console.error('Error al conectar o realizar el respaldo:', error);
    res.status(500).json({ error: 'Error al realizar el respaldo de la base de datos' });
  }
});

module.exports = router;
