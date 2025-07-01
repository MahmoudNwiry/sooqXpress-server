const mongoose = require('mongoose');
const ShopSchema = mongoose.Schema({
    shopId:{
        type: String,
    },
    ownerName : {
        type: String,
    },
    ownerId : {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    password: {
        type: String,
    },
    name: {
        type: String,
    },
    type: {
        type: String,
        enum: ['متجر الكتروني', 'متجر طبيعي'],
        required: true
    },
    logo: {
        type: String
    },
    description : {
        type: String
    },
    subscripe: {
        type : {
            type : mongoose.Types.ObjectId,
            ref: "SubscriptionPlan",
            required: true
        },
        startDate: {
            type: Date
        },
        endDate: {
            type : Date
        },
        status : {
            type: String,
            enum: ['active', 'expired', 'canceled'],
            default: 'active'
        }
    },
    address: {
         addressId: {
            type : mongoose.Types.ObjectId,
            ref : 'Address'
        },
        details : {
            type: String,
            required: true,
        }
    },
    category : [
        {
            type: mongoose.Types.ObjectId,
            ref: 'ShopCategory'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Shop', ShopSchema);