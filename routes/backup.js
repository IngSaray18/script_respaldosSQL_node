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
      requestTimeout: 1200000
    },
  };

const BBDD = 'VentanillaWeb';

router.get('/backup-databaseVentanillaWeb', async (req, res) => {
  try {
    // Conectar a la base de datos
    await sql.connect(dbConfig);
    console.log('Conexión exitosa');

    // Obtener la fecha actual en formato "yyyymmdd"
    const currentDate = moment().format('YYYYMMDD');

    // T-SQL para realizar un respaldo de la base de datos
    const backupScript = `
      BACKUP DATABASE VentanillaWeb
      TO DISK = 'G:/RespaldosProduccion/RespaldoVentanillaWeb${currentDate}.bak'
      WITH FORMAT, MEDIANAME = 'BD_SeguirdadBackup', NAME = 'BD_Seguridad-Full Database Backup';
    `;

    // Ejecutar el script de respaldo
    const result = await sql.query(backupScript);

    // Cerrar la conexión
    await sql.close();
    console.log('Conexión cerrada');

    res.json({ message: 'Respaldo de base de datos exitoso', filename: `VentanillaWeb${currentDate}.bak` });
  } catch (error) {
    console.error('Error al conectar o realizar el respaldo:', error);
    res.status(500).json({ error: 'Error al realizar el respaldo de la base de datos' });
  }
});


router.get('/backup-databaseBDSeg', async (req, res) => {
  try {
    // Conectar a la base de datos
    await sql.connect(dbConfig);
    console.log('Conexión exitosa');

    // Obtener la fecha actual en formato "yyyymmdd"
    const currentDate = moment().format('YYYYMMDD');

    // T-SQL para realizar un respaldo de la base de datos
    const backupScript = `
      BACKUP DATABASE BD_Seguridad
      TO DISK = 'G:/RespaldosProduccion/RespaldoBDSeguridad${currentDate}.bak'
      WITH FORMAT, MEDIANAME = 'BD_SeguirdadBackup', NAME = 'BD_Seguridad-Full Database Backup';
    `;

    // Ejecutar el script de respaldo
    const result = await sql.query(backupScript);

    // Cerrar la conexión
    await sql.close();
    console.log('Conexión cerrada');

    res.json({ message: 'Respaldo de base de datos exitoso', filename: `BD_Seguridad${currentDate}.bak` });
  } catch (error) {
    console.error('Error al conectar o realizar el respaldo:', error);
    res.status(500).json({ error: 'Error al realizar el respaldo de la base de datos' });
  }
});

router.get('/backup-databaseCajaAhorro', async (req, res) => {
  try {
    // Conectar a la base de datos
    await sql.connect(dbConfig);
    console.log('Conexión exitosa');

    // Obtener la fecha actual en formato "yyyymmdd"
    const currentDate = moment().format('YYYYMMDD');

    // T-SQL para realizar un respaldo de la base de datos
    const backupScript = `
      BACKUP DATABASE CajaAhorro
      TO DISK = 'G:/RespaldosProduccion/RespaldoCajaAhorro${currentDate}.bak'
      WITH FORMAT, MEDIANAME = 'CajaAhorroBackup', NAME = 'CajaAhorro-Full Database Backup';
    `;

    // Ejecutar el script de respaldo
    const result = await sql.query(backupScript);

    // Cerrar la conexión
    await sql.close();
    console.log('Conexión cerrada');

    res.json({ message: 'Respaldo de base de datos exitoso', filename: `CajaAhorro${currentDate}.bak` });
  } catch (error) {
    console.error('Error al conectar o realizar el respaldo:', error);
    res.status(500).json({ error: 'Error al realizar el respaldo de la base de datos' });
  }
});

router.get('/backup-databaseCajaAhorroT', async (req, res) => {
  try {
    // Conectar a la base de datos
    await sql.connect(dbConfig);
    console.log('Conexión exitosa');

    // Obtener la fecha actual en formato "yyyymmdd"
    const currentDate = moment().format('YYYYMMDD');

    // T-SQL para realizar un respaldo de la base de datos
    const backupScript = `
      BACKUP DATABASE CajaAhorroT
      TO DISK = 'G:/RespaldosProduccion/RespaldoCajaAhorroT${currentDate}.bak'
      WITH FORMAT, MEDIANAME = 'CajaAhorroTBackup', NAME = 'CajaAhorroT-Full Database Backup';
    `;

    // Ejecutar el script de respaldo
    const result = await sql.query(backupScript);

    // Cerrar la conexión
    await sql.close();
    console.log('Conexión cerrada');

    res.json({ message: 'Respaldo de base de datos exitoso', filename: `CajaAhorroT${currentDate}.bak` });
  } catch (error) {
    console.error('Error al conectar o realizar el respaldo:', error);
    res.status(500).json({ error: 'Error al realizar el respaldo de la base de datos' });
  }
});
module.exports = router;
