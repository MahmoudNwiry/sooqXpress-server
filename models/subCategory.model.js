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
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true
    }
})

const subCategoryModel = mongoose.model("SubCategory", SubCategorySchema);

module.exports = subCategoryModel;