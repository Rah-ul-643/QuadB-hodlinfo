
const axios = require('axios'); 

const pool = require("../config/database");

// Fetch data from WazirX API
const getTopResults= async ()=>{
    try {
        const res= await axios.get('https://api.wazirx.com/api/v2/tickers');
        const requestData= res.data;
        const dataArray= Object.values(requestData).slice(0,10);
        return dataArray;
        
    } catch (error) {
        console.log("An error occured during fetching data from API: " + error);
        throw error;
    }
    
}


const addToDatabase = async ()=>{

    try {
        const dataArray=await getTopResults();

        for (let i = 0; i < dataArray.length; i++) {

          const data = dataArray[i];
          const query = {
            text: 'INSERT INTO apidata (name, last, buy, sell, volume, base_unit) VALUES ($1, $2, $3, $4, $5, $6)',
            values: [data.name, data.last, data.buy, data.sell, data.volume, data.base_unit]
          };

          await pool.query(query);
        }

        console.log('All data inserted successfully');

      } catch (err) {
        console.error('Error inserting data:', err);
        throw err;
      } 

}

const fetchFromDatabase= async ()=>{

    try {
        const dbResponse= await pool.query("SELECT * from apidata");
        const data= dbResponse.rows;
        return data;

    } catch (error) {
        console.log("An error occured during fetching from database: "+error);
    }
    
}

const deleteFromDatabase= async ()=>{
    try {
        await pool.query("DELETE FROM apidata");
        console.log("successfully deleted all data from database");

    } catch (error) {
        console.log("An error occured while deleting: "+error);
        throw error;
    }
}

module.exports= {addToDatabase,fetchFromDatabase,deleteFromDatabase}