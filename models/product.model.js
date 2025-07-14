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
    offer: {
        hasOffer: { type: Boolean, default: false },
        offerPrice: { type: Number, default: 0 }, 
        offerPercentage: { type: Number, default: 0 },
        startDate: { type: Date },
        expiryDate: { type: Date },
        isActive: { type: Boolean, default: false }
    },
    // 
    category: [{ type: mongoose.Types.ObjectId, ref: 'Category' }],
    store: { type: mongoose.Types.ObjectId, ref: 'Shop' }, // المتجر صاحب المنتج

    tags: [{ type: String }], // كلمات مفتاحية للبحث
    ratings: [{
        user: { type: mongoose.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 1, max: 5 },
        comment: {
            type: String,
            default: ''
        },
        createdAt: { type: Date, default: Date.now }
    }],
    rating: {
        totalRatings: { type: Number, default: 0 }, // إجمالي التقييمات
        averageRating: { type: Number, default: 0 } // متوسط التقييم
    }, // متوسط التقييم
    reviews: [{
        user: { type: mongoose.Types.ObjectId, ref: 'User' },
        review: String,
        createdAt: { type: Date, default: Date.now }
    }],
    

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);