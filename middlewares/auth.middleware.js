const jwt = require("jsonwebtoken");
const Role = require("../models").Role
const User = require("../models").User
const Shop = require("../models").Shop
const Permission = require("../models").Permission

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({userId: decoded.userId})
                                        .populate({
                                            path: "role",
                                            populate: {
                                                path: "permissions"
                                            }
                                        })    
    if(!user) {
        return res.status(401).json({"message" : "لم يتم العثور على المستخدم"});
    }

    req.userData = {};
    req.userData.userId = decoded.userId;
    req.userData.role = user.role.name
    next();
  } catch (err) {
    return res.status(500).json({
      message: "فشل المصادقة يرجى اعادة تسجيل الدخول"
    });
  }
};

const verifyTokenShop = async (req, res, next) => {
  try{
    const token = req.headers.authorization.replace("Bearer ", "");  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const shop = await Shop.findOne({shopId: decoded.shopId});

    if(!shop) {
      return res.status(401).json({"message" : "لم يتم العثور على المتجر"});
    }

    req.shopData = {};
    req.shopData.shopId = decoded.shopId;
    next();
  } catch (err) {
    return res.status(500).json({
      message: "فشل المصادقة يرجى اعادة تسجيل الدخول"
    });
  }
  
}

module.exports = {
  verifyToken,
  verifyTokenShop
}
