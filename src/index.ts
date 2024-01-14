import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routers/index'
import path from 'path';
import { Server } from 'socket.io';
import { ChatModel } from './db/chats';

// import morgan from 'morgan';

const app = express();

app.use(cors({
    origin: ["https://seojin7022.github.io/ChatApp", "http://localhost:3000"],
    credentials: true
}));

app.use("/", (req, res, next) => {
  if (req.path.endsWith(".svg") || req.path.endsWith(".json") || req.path.startsWith("/static")) return next();
  console.log(res.statusCode.toString(), req.path);
  return next();
});

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());



// const options = {
//   key: fs.readFileSync(path.join(__dirname, 'path/to/your/private.key')),
//   cert: fs.readFileSync(path.join(__dirname, 'path/to/your/certificate.crt'))
// };

// https.createServer(options, app).listen(8080, () => {
//     console.log('HTTPS server running on port 8080');
//   });


const MONGO_URL = 'mongodb+srv://seojin7022:seojin7022@cluster0.y7y5klt.mongodb.net/?retryWrites=true&w=majority'

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', async (socket) => {
  socket.on('chat message', (msg) => {
    console.log(msg);
    
    io.emit('chat message', msg);
  });

  socket.on('chat record', async (data) => {
    await ChatModel.updateOne({ _id: data.id }, { $set: { records: data.chatRecord, lastRecord: data.chatRecord[data.chatRecord.length - 1] } });
    console.log("Update Succeed");
    
  })

  socket.on('disconnect', () => {
    console.log("Disconnect");
    
  })
})

server.listen(80, () => {
  console.log("Server lauched ✅");
  
})



app.use('/', router());
app.use(express.static(path.join(process.cwd(), 'ChatApp')));
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), 'ChatApp', 'index.html'))
})
