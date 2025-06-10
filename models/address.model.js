const mongoose = require('mongoose');
const addressSchma = mongoose.Schema({
    country : {
        type: String,
        require : true,
        default : "فلسطين"
    },
    city : {
        type: String,
        require : true,
        default : "قطاع غزة"
    },
    governorate : {
        type: String,
        require : true,
        enum : ['رفح', 'خانيونس', 'الوسطى', 'غزة', 'شمال غزة']
    },
    area: {
        type: String,
        require : true
    },
    deliveryPrice: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model("Address", addressSchma)