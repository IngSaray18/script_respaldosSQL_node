import  express  from "express";
import { exec }  from 'child_process';
import { Server as SocketServer } from "socket.io";
import http, { createServer } from "http";
const app = express();

const server = http.createServer(app);

const io = new SocketServer(server, { 
  cors: {
      origin: 'http://localhost:5173'
  }
} )

const puerto = 3000;

app.get('/', (req, res) => {
  res.send('Servidor en ejecución');
});

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.on('ejecutar-comando', (comando) => {
    if (!comando) {
      socket.emit('resultado', { error: 'Se requiere un comando' });
      return;
    }

    exec(comando, (error, stdout, stderr) => {
      if (error) {
        socket.emit('resultado', { error: `Error al ejecutar el comando: ${error}` });
        return;
      }

      const resultado = {
        stdout: stdout,
        stderr: stderr
      };

      socket.emit('resultado', resultado);
    });
  }); 


} )

server.listen(puerto, () => {
  console.log(`Servidor en ejecución en http://localhost:${puerto}`);
});
