// Setup empty JS object to act as endpoint for all routes
 projectData = {};

// Require Express to run server and routes
const express=require('express');

// Require bodyParser 
const bodyParser=require('body-parser');

// Start up an instance of app
const app=express();

// set port
const port=3000;

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
app.listen(port,()=>{
    console.log(`Server is success and running on port:${port}`);
});



// post in server
app.post('/add',(req,res)=>{
    projectData=req.body;
});


// Server send
app.get('/all',(req,res)=>{
    res.send(projectData);
    projectData={};
});










