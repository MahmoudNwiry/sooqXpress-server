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
});

const SubscriptionPlanModel = mongoose.model("SubscriptionPlan", SubscriptionPlanSchema);

module.exports = SubscriptionPlanModel