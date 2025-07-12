const mongoose = require('mongoose');
const ShopCategorySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('ShopCategory', ShopCategorySchema);