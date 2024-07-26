import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import Approutes from './src/routes/index.js'
dotenv.config()


const PORT=process.env.PORT;
const app = express();
    app.use(cors()) 
    app.use(express.json());
    app.use('/',Approutes)
    app.listen(PORT,()=>console.log(`App is listening port 8000`))