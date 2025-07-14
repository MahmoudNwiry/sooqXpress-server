const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Category", CategorySchema)