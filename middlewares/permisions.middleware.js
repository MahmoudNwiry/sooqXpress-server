const Role = require("../models").Role
const User = require("../models").User
const Permission = require("../models").Permission

const isOwner = async (req, res, next) => {
    try{
        const user = await User.findOne({userId: req.userData.userId}).populate('role');
        if(!user) {
            return res.status(401).json({"message" : "المستخدم غير موجود"})
        }
        if(user.role.name !== 'owner') {
            return res.status(403).json({"message" : "لا تمتلك صلاحيات"})
        }
        next();
    } catch (error) {
        return res.status(500).json({error : error})
    }
}

const hasAddressPermision = async (req, res, next) => {  
    try {
       const user = await User.findOne({userId: req.userData.userId})
                                        .populate({
                                            path: "role",
                                            populate: {
                                                path: "permissions"
                                            }
                                        })

        if(!user) {
            return res.status(404).json({"message" : "لم يتم العثور على المستخدم"});
        }
        
        if(user.role.name === 'owner') {
            next();
        }
        else {
            const permission = user.role.permissions.find(permission => permission.permissionName === "addresses");
            if(!permission) {
                return res.status(403).json({"message" : "لا تمتلك الصلاحيات"})
            }
            next();
        }
    }
    catch (error) {
        return res.status(403).json({error : error})
    }
}

const hasShopPermision = async (req, res, next) => {  
    try {
       const user = await User.findOne({userId: req.userData.userId})
                                        .populate({
                                            path: "role",
                                            populate: {
                                                path: "permissions"
                                            }
                                        })

        if(!user) {
            return res.status(404).json({"message" : "لم يتم العثور على المستخدم"});
        }
        
        if(user.role.name === 'owner') {
            next();
        }
        else {
            const permission = user.role.permissions.find(permission => permission.permissionName === "shops");
            if(!permission) {
                return res.status(403).json({"message" : "لا تمتلك الصلاحيات"})
            }
            next();
        }
    }
    catch (error) {
        return res.status(403).json({error : error})
    }
}


module.exports = {
    hasAddressPermision,
    hasShopPermision,
    isOwner
}