const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.User = require('./user.model')
db.Role = require('./role.model')
db.Permission = require('./permisions.model')
db.Category = require('./category.model')
db.Address = require('./address.model')
db.Shop = require('./shop.model')
db.SubscriptionPlan = require('./subscriptionPlan.model')
db.ShopCategory = require('./shopCategory.model')
db.Product = require('./product.model')
db.Offer = require('./offer.model')
db.SubCategory = require('./subCategory.model')

module.exports = db