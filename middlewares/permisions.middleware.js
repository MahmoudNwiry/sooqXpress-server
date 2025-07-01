const isOwner = async (req, res, next) => {
    try{
        if(req.userData.role !== 'owner') {
            return res.status(403).json({"message" : "لا تمتلك صلاحيات"})
        }
        next();
    } catch (error) {
        return res.status(500).json({error : error})
    }
}

const hasPermision = async (req, res, next) => {  
    try {
        if(req.userData.role === 'owner') {
            next();
        }
        else {
            const permission = req.userData.role.permissions.find(permission => permission.permissionName === req.permissionNeeded);
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

const hasAddressPermission = async (req, res, next) => {
    req.permissionNeeded = "addresses"
    hasPermision(req, res, next);
}


const hasShopPermission = async (req, res, next) => {  
    req.permissionNeeded = "shops"
    hasPermision(req, res, next);
}

const hasShopCategoryPermision = async (req, res, next) => {
    req.permissionNeeded = "shopCategory"
    hasPermision(req, res, next);
}

const hasSubscriptionPermission = async (req, res, next) => {
    req.permissionNeeded = "subscriptions"
    hasPermision(req, res, next);
}



module.exports = {
    hasAddressPermission,
    hasShopPermission,
    hasShopCategoryPermision,
    hasSubscriptionPermission,
    isOwner
}