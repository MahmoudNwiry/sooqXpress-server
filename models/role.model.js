const mongoose = require('mongoose');
const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    nameAr: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    permissions: [{
        type: mongoose.Types.ObjectId,
        ref: 'Permission'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Role', RoleSchema)