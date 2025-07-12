const express = require('express')
//Importing the JWT package
const jwt = require('jsonwebtoken')
//Importing the bcrypt package
const bcrypt = require('bcryptjs')
//Imprtong the user model 
const User = require('../models').User
const Role = require('../models').Role
const Shop = require('../models').Shop
const { v4: uuidv4 } = require('uuid')
const { getIO } = require('../socket')
const { getViewUrl } = require('../s3')

require("dotenv").config();

const io = getIO();

const register = async (req, res) => {

    //Destructuing the inputs from req.body 
    const { firstName, lastName, phoneNumber, password, avatar, role } = req.body;

    if(!firstName || !lastName || !password) {
        return res.status(400).json({"message" : "الرجاء اكمال البيانات"})
    }

    try {
        let ROLE = null;

        if (!role) {
            ROLE = await Role.findOne({ name: "user" });
        } else {
            ROLE = await Role.findOne({ id: role })
        }

        if (!ROLE) {
            return res.status(404).json({"message" : "the Role is not found"})
        }

        //Verifying the email address inputed is not used already 
        const verifyPhoneNumber = await User.findOne({ phoneNumber: phoneNumber })
        if (verifyPhoneNumber) {
            return res.status(403).json({
                message: "رقم الهاتف هذا مسجل بالفعل"
            })
        } else {
            //generating userId
            const userId = uuidv4()
            //using bcrypt to hash the password sent from the user
            bcrypt.hash(password, 10)
                .then((hash) => {
                    //Registering the user
                    const user = new User({
                        userId: userId,
                        firstName: firstName,
                        lastName: lastName,
                        phoneNumber: phoneNumber,
                        password: hash,
                        avatar: avatar || "https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png",
                        role : ROLE._id
                    });
                    
                    let jwtToken = jwt.sign(
                        {
                            userId: userId
                        },
                        process.env.JWT_SECRET
                    )

                    user.save()
                        .then((response) => {
                            return res.status(200).json({
                                message: 'تم إنشاء الحساب بنجاح',
                                user: response,
                                role : ROLE.name,
                                accessToken: jwtToken,
                                success: true
                            })
                        })
                        .catch((error) => {
                            res.status(500).json({
                                error: error,
                            })
                        })
                })
        }
    }
    catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        })
    }

}


const login = async (req, res) => {
    const { phoneNumber, password } = req.body
    
    try {
        const user = await User.findOne({ phoneNumber: phoneNumber }).populate("role")
        if (!user) {
            return res.status(401).json({
                message: "رقم الهاتف غير مسجل",
                success: false
            })
        }

        const pass = await bcrypt.compare(password, user.password)

        if (!pass) {
            return res.status(401).json({
                message: "كلمة المرور غير صحيحة",
                success: false
            })
        }



        let jwtToken = jwt.sign(
            {
                userId: user.userId
            },
            process.env.JWT_SECRET
        )

        return res.status(200).json({
            accessToken: jwtToken,
            user: {
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                avatar: user.avatar,
                role: user.role.nameAr
            }
        })

    } catch (error) {
        return res.status(401).json({
            messgae: err.message,
            success: false
        })
    }

}

const shopLogin = async (req, res) => {
    const { phoneNumber, password } = req.body

    try {
        const shop = await Shop.findOne({ phoneNumber: phoneNumber }).populate("address.addressId")
        if (!shop) {
            return res.status(401).json({
                message: "رقم الهاتف غير مسجل",
                success: false
            })
        }
        if (!shop.logo) {
            shop.logo = "https://www.citypng.com/public/uploads/preview/shop-logo-icon-11553388566q1x4k0bq2a.png"
        }
        shop.logo = await getViewUrl(shop.logo);

        const pass = await bcrypt.compare(password, shop.password)
        if (!pass) {
            return res.status(401).json({
                message: "كلمة المرور غير صحيحة",
                success: false
            })
        }
        let jwtToken = jwt.sign(
            {
                shopId: shop.shopId
            },
            process.env.JWT_SECRET
        )
        return res.status(200).json({
            accessToken: jwtToken,
            shop: {
                shopId: shop.shopId,
                name: shop.name,
                owner: {
                    name: shop.ownerName,
                    id: shop.ownerId
                },
                address: {
                    governorate: shop.address.addressId.governorate,
                    area: shop.address.addressId.area,
                    details: shop.address.details,
                },
                phoneNumber: shop.phoneNumber,
                logo: shop.logo,
            }
        })
    }
    catch (error) {
        return res.status(401).json({
            messgae: error.message,
            success: false
        })
    }
}


const userProfile = async (req, res) => {

    
    try {
        //verifying if the user exist in the database
        const verifyUser = await User.findOne({ userId: req.userData.userId }).populate("role")
        if (!verifyUser) {
            return res.status(403).json({
                message: "user not found",
                success: false,
            })
        } else {
                return res.status(200).json({
                    messgae: `user ${verifyUser.firstName} ${verifyUser.lastName} found`,
                    user: {
                        userId: verifyUser.userId,
                        firstName: verifyUser.firstName,
                        lastName: verifyUser.lastName,
                        phoneNumber: verifyUser.phoneNumber,
                        avatar: verifyUser.avatar,
                        role: verifyUser.role.nameAr,
                        address: []
                    },
                    success: true
                })
        }
    }
    catch (error) {
        return res.status(401).json({
            sucess: false,
            message: error.message,
        })
    }
};

const shopProfile = async (req, res) => {
    try {
        const verifyShop = await Shop.findOne({ shopId: req.shopData.shopId }).populate("address.addressId").populate("category.categoryId").populate("subscriptionPlan.subscriptionPlanId");
        if (!verifyShop) {
            return res.status(403).json({
                message: "shop not found",
                success: false,
            })
        }
        else {

            if (!verifyShop.logo) {
                verifyShop.logo = "https://www.citypng.com/public/uploads/preview/shop-logo-icon-11553388566q1x4k0bq2a.png"
            }
            verifyShop.logo = await getViewUrl(verifyShop.logo);


            return res.status(200).json({
                    messgae: `Shop ${verifyShop.name} found`,
                    shop: {
                        shopId: verifyShop.shopId,
                        name: verifyShop.name,
                        owner: {
                            name: verifyShop.ownerName,
                            id: verifyShop.ownerId
                        },
                        address: {
                            governorate: verifyShop.address.addressId.governorate,
                            area: verifyShop.address.addressId.area,
                            details: verifyShop.address.details,
                        },
                        phoneNumber: verifyShop.phoneNumber,
                        logo: verifyShop.logo,
                        category: verifyShop.category,
                        description: verifyShop.description || "",
                        subscriptionPlan: verifyShop.subscriptionPlan || null,
                    },
                    success: true
                })
        }
    }
    catch (error) {
        return res.status(401).json({
            sucess: false,
            message: error.message,
        })
    }
}

module.exports = {
    register,
    login,
    shopLogin,
    userProfile,
    shopProfile
}