import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import bodyParser from 'body-parser';

//latest syntex to import 
import { Connection } from './database/db.js';
import router from './routes/route.js';

dotenv.config();

const app = express();  

//app.use is used to handle any type of requests or method 
//app.use(path,handler function)

app.use(cors())

//to handle invalid chars in url 
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
// app.use('/user', router)

app.use('/', router)

app.get("/",(req,res)=>{

    res.send("Hello user ")

})
app.get("/login", router)


const PORT = 8000;

const USERNAME = process.env.DB_USERNAME

const PASSWORD = process.env.DB_PASSWORD

//parse the importted usrname and password
Connection(USERNAME, PASSWORD);

app.listen(PORT,() =>{

    console.log(`server is running on port: ${PORT}`)

});