import * as dotenv from "dotenv"
dotenv.config()
import express from 'express';
import router from "./api/routes.js";
import connectDB from "./connectDB.js";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json())


app.get('/',(req,res)=>{
    res.send('Welcome to The Internet Folks API')
})

app.use("/",router)


app.listen(process.env.PORT || 4000,()=>{
    connectDB()
    console.log("server started");
})