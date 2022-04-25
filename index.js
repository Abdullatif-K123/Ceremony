const app = require('./app'); 


const host = 3000 | process.env.Port; 
app.listen(host, ()=>{
     console.log("SERVER HAS JUST STARTED"); 
})