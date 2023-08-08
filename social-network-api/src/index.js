import express from 'express';
import usersRoutes from './routes/users.routes.js';
import postRoutes from './routes/posts.routes.js'
import cors from 'cors'
import { Server } from 'socket.io';
import http, { request } from 'node:http'


const app = express();
app.use(cors({
  origin: "*"
}))

process.env.TZ = 'UTC';

const httpServer = http.createServer(app)

// Create global chat
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
})

io.on('connection', (socket) => {
  socket.on("message", (body) => {
    socket.broadcast.emit('message', {
      body,
      from: " " /* socket.id.slice(6) */
    })
  })
})

const port = 3000;

app.use(express.json())

app.use('/auth', usersRoutes)


app.use('/api', postRoutes)

httpServer.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto: ${port}`);
});

