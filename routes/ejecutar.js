const express = require('express');
const { exec } = require('child_process');

const router = express.Router();

router.get('/ejecutar-code', (req, res) => {
  // Ejecuta el comando "firefox" (puede variar según tu sistema operativo)
  exec('firefox', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al ejecutar el comando "firefox": ${error}`);
      return res.status(500).send('Error interno del servidor');
    }

    console.log(`Comando "firefox" ejecutado con éxito: ${stdout}`);
    return res.send('Comando "firefox" ejecutado con éxito ' + stdout);
  });
});

module.exports = router;
