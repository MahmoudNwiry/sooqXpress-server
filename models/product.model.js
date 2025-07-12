const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    images: {
        thumbnail: String,
        show: [String] // مصفوفة للصور الكبيرة
    },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    // التصنيفات/الفئات
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' }, // المتجر صاحب المنتج

    tags: [{ type: String }], // كلمات مفتاحية للبحث
    ratings: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 1, max: 5 },
        comment: String,
        createdAt: { type: Date, default: Date.now }
    }],
    reviews: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        review: String,
        createdAt: { type: Date, default: Date.now }
    }],
    

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);