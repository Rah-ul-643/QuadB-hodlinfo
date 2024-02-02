const router = require("express").Router();
const pool = require("../config/database");
const { addToDatabase, fetchFromDatabase, deleteFromDatabase} = require("../controllers/apiController");


router.get('/data', async (_req,res)=>{
    try {
        await addToDatabase();                                      // fetch and add all the fetched data to database.
        const data= await fetchFromDatabase();                      // retreive all added data from the database
        await deleteFromDatabase();                                 // delete once the data is retreived
        res.status(200).send(data);                 

    } catch (error) {
        console.log("An error occured: "+error);
        res.status(400).json({"error":error.message})
    }
    
})

module.exports= router;
