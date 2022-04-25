const router = require("express").Router();
const Order = require('../model/order');
const {verifyToken, verifyTokenAndAdmin} =  require('../middleware/verify');

router.get('/home', verifyToken , async(req, res)=>{
      try{
        
          const prevOrder = await Order.find({userId: req.user.user_id}, {_id: 0, userId: 0}); 
          if(prevOrder.length){
               res.status(200).json(prevOrder); 
          }
          else{
              res.status(200).send("There are no order Yet!");
          }
      }catch(err){
           res.status(400).send("There are problem to reach the route /home !!");
      } 
}); 
router.post('/newOrder', verifyToken, async(req, res)=>{
     try{
        const {Event_Type, Date, City, Location, Number_Guests, Service_Class, Name, Phone} = req.body;
        if(!(Event_Type&&Date&&City&&Location&&Number_Guests&&Service_Class&&Name&&Phone)){
             res.status(400).send("Please Enter all the data Please Okay!!"); 
        }
        else{
         const neworder = new Order({
              userId: req.user.user_id,
              Event_Type,
              Date,
              City,
              Location,
              Number_Guests,
              Service_Class,
              Name, 
              Phone
         });
        
        const saveOrder = await neworder.save(); 
        res.status(200).json(saveOrder);
        }
     }catch(err){
          res.status(400).send("There are problem with send the data");
     }
});

module.exports = router;