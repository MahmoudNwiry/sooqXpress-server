const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
     addressId: {
        type : mongoose.Types.ObjectId,
        ref : 'Address'
    },
    details : {
        type: String,
        required: true,
    },
    isDefault: {
        type: Boolean
    }
}, {_id : true})


const userSchema = mongoose.Schema({
    userId:{
        type:String
    }, 
    firstName:{
        type:String 
    }, 
    lastName:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    avatar: {
        type: String
    },
    feeds: [{
        type: mongoose.Types.ObjectId,
        ref : 'Category'
    }],
    address : {
        type : [addressSchema],
        validate: {
            validator: function (arr) {
                return arr.length <= 3;
            },
            message: 'مسموح فقط بـ 3 عناوين استلام'
        }
    },
    role: {
        type: mongoose.Types.ObjectId,
        ref: 'Role'
    },
    password: {
        type:String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", userSchema)