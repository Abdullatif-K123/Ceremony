const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({ 
    user_name: {type: String, default: null, required: true}, 
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: Number, required: true},
    IsAdmin: {type: Boolean, default: true},
    token: {type: String}, 
}); 

module.exports = mongoose.model('user', userSchema);