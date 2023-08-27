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

// Use the cors middleware and allow requests from both origins
app.use(cors({
    origin: ["https://create-your-space-serverside.vercel.app/", "http://localhost:3000"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
//to handle invalid chars in url 
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
// app.use('/user', router)

app.use('/', router)

app.get("/",(req,res)=>{

    res.send("Hello user ")

})
app.get("/login", router)


// const PORT = 8000;
// const PORT = 'https://create-your-space.vercel.app/'
const USERNAME = process.env.DB_USERNAME

const PASSWORD = process.env.DB_PASSWORD

//parse the importted usrname and password
Connection(USERNAME, PASSWORD);

// app.listen(PORT,() =>{

//     console.log(`server is running on port: ${PORT}`)

// });

app.listen( () => {
    console.log("Server is running");
})