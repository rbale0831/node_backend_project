import express from 'express';
import mongoose from 'mongoose';
import { APP_PORT, DB_URL } from './config'
import errorHandler from './middlewares/errorHandler';
const app = express();
import router from './routes'
import path from 'path'


mongoose.connect(DB_URL, { useNewURLParser: true, useUnifiedTopology: true/*, useFindAndModify: false*/})
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'))
db.once('open',()=>{
    console.log('DB connected..')
})

global.appRoot = path.resolve(__dirname);
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api',router)


app.use(errorHandler);
app.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT}`))