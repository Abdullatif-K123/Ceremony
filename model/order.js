const mongoose = require('mongoose'); 

const orderSchema = new mongoose.Schema({ 
    userId: {type: String, required: true}, 
    Event_Type: {type: String, default: null, required: true}, 
    Date: {type: Date, required: true},
    City: {type: String, required: true},
    Location: {type: String, required: true},
    Number_Guests: {type: Number, required: true},
    Service_Class: {type: String, required: true}, 
    Name: {type: String, required: true}, 
    Phone: {type: Number, required: true},
    status: {type: String, default: "pending"}
},{timestamps: true}); 

module.exports = mongoose.model('order', orderSchema);