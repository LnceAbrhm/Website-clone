import express, { request, response } from 'express';
import mongoose from 'mongoose';
import { PORT, MONGO_URI } from './config.js';
import { Users } from './models/User.js';
import { Status } from './models/Status.js';
import { Highlights } from './models/Highlight.js';
import { Trendings } from './models/Trending.js';
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
    logger(req);
    return res.send('Twitter Clone');
});

//Route gets all the users
app.get('/users', async (req,res) =>{
    try{
        const users = await Users.find({});
        const extractNames = []; 
       for(let i = 0; i<users.length; i++){
        extractNames[i] = {id: users[i]._id, uname : users[i].uname, name : users[i].name};
       }

        res.status(200).json({
            count: users.length,
            data: extractNames
        });
    } 
    catch (error){
        logger(error);
        res.status(500).send({message: error.message});

    }
});

//Route to get all tweets
app.get('/status', async (req,res) => {
    try{
        const status = await Status.find({});
        res.status(200).json(status)
    }
    catch(error){
        logger(error);
        res.status(500).send({message: error.message})
    }
});

// 
app.post('/createStatus', async (req, res) => {
     try{
        console.log(req.body)
        const newStatus = {
            uname: req.body.uname.current,
            status: req.body.status,
            likes: 0,
            repost: 0,
            comments: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        const status = await Status.create(newStatus);
        return res.status(201).send(status);
        
    }
    catch(err){
        logger(err);
        res.status(500).send({message: err.message});
    }
});

app.get('/trending', async (req, res)=>{

    try{
        
        const highlight = await Highlights.find({}).limit(1);
        const trend = await Trendings.find({}).limit(4);
        
        res.status(200).json({
            highlight : highlight,
            trend : trend
        }
        );
        
    }
    catch(error){
        logger(error);
        res.status(500).send({message: error.message});
    }
});

//Route to get a user
app.get('/:uname', async (req, res) =>{

    try{

        const { uname } = req.params;
        const user = await Users.findOne({uname: `${uname}`});
        res.status(200).json(user);
        
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