const mongoose = require('mongoose');
const ShopCategorySchema = mongoose.Schema({
    name: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('ShopCategory', ShopCategorySchema);