const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL; 
 
 exports.connect =  () => {
       mongoose.connect(MONGO_URL)
      .then(() =>  {
         console.log(("Successfully connected to Database"));
      })
      .catch((error)=>{
           console.log(('Database connection failed!!!')); 
           console.error(error);
      }); 
}