const mongoose = require("mongoose");
const SubscriptionPlanSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    duration: {
        type: String,
        enum: ["يومي", "إسبوعي", "شهري", "سنوي"]
    },
    features: {
        type: [String]
    },
    limits : {
        products: {type: Number},
        offers: {type: Number}
    }
});

const SubscriptionPlanModel = mongoose.model("SubscriptionPlan", SubscriptionPlanSchema);

module.exports = SubscriptionPlanModel