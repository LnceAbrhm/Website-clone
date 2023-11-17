import express, { request, response } from 'express';
import mongoose from 'mongoose';
import { PORT, MONGO_URI } from './config.js';
import { Users } from './models/User.js';
import { Status } from './models/Status.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

mongoose
	.connect(MONGO_URI)
    .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
	console.log(`DB connection error: ${err.message}`);
});

app.get('/home', (req, res) => {
    console.log(req);
    return res.send('Twitter Clone');
});

//Route gets all the users
app.get('/users', async (req,res) =>{
    try{
        const users = await Users.find({});
        res.status(200).json({
            count: users.length,
            data: users
        });
    } 
    catch (error){
        console.log(error);
        res.status(500).send({message: error.message});

    }
});

//Route to get all tweets
app.get('/status', async (req,res) => {
    try{
        // const newStatus = {
        //     uname: "CStark",
        //     status: "Minima odit officiis minima nam. Aspernatur id reprehenderit eius inve…",
        //     likes: 1,
        //     repost: 2,
        //     comments: 3,
        //     createdAt: new Date().toISOString(),
        //     updatedAt: new Date().toISOString(),
        // }
        // const test = await Status.create(newStatus);
        const status = await Status.find({});
        res.status(200).json(status)
    }
    catch(error){
        logger(error);
        res.status(500).send({message: error.message})
    }
});

// app.get('/createStatus', async (req, res) => {
//     const newStatus = {
//         uname: "CStark",
//         status: "Minima odit officiis minima nam. Aspernatur id reprehenderit eius inve…",
//         likes: 1,
//         repost: 2,
//         comments: 3,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }
//     const test = await Status.create(newStatus);
// });

//Route to get a user
app.get('/:uname', async (req, res) =>{

    try{

        const { uname } = req.params;
        const user = await Users.findOne({uname: `${uname}`});
        res.status(200).json(user);
        logger(uname);
        
    }
    catch(error){
        logger(error);
        res.status(500).send({message: error.message});
    }
});




function logger(log){
    console.log(log)
}
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate');
});