const express = require('express');
const app= express();

require('dotenv').config();

const port = process.env.PORT;

const dataApi= require('./api/dataApi');

app.use(express.static('public'));

//routes

app.get('/', (req,res)=>{
    res.sendFile('index.html')
})
app.use('/api/v1',dataApi);

app.listen(port,()=>{
    console.log(`server running on port: ${port}`);  
})