const mongoose = require('mongoose');
const PermissionSchema = mongoose.Schema({
    permissionName: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Permission', PermissionSchema);