import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routers/index'
import fs from 'fs';
import https from 'https';
import path from 'path';

const app = express();

app.use(cors({
    origin: ["https://seojin7022.github.io/ChatApp", "http://localhost:3000"],
    credentials: true
}));

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

const server = http.createServer(app);

server.listen(3000, () => {
  console.log("Server lauched ✅");
  
})

const MONGO_URL = 'mongodb+srv://seojin7022:seojin7022@cluster0.y7y5klt.mongodb.net/?retryWrites=true&w=majority'

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());
app.use(express.static(path.join(process.cwd(), 'ChatApp')));

app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), 'ChatApp', 'index.html'))
})