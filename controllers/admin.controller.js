const Address = require('../models').Address
const Shop = require('../models').Shop
const ShopCategory = require('../models').ShopCategory
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs')

const addAddress = async (req, res) => {
    
    const {country, city, governorate, area, deliveryPrice} = req.body;
    console.log("req.body", req.body);
    try {

        const address = new Address({
            country: country || 'فلسطين',
            city: city || 'قطاع غزة',
            governorate : governorate,
            area: area,
            deliveryPrice: deliveryPrice,
        })

        address.save()
               .then(()=>{
                    return res.status(200).json({"message" : "تم إنشاء العنوان بنجاح"})
               })
               .catch((error) => {
                    res.status(500).json({
                        error: error,
                    })
               })

    } catch (error) {
        res.status(412).json({
            error: error,
        })
    }

}

const createShop = async (req, res) => {
    const {name, phoneNumber, password, ownerName, ownerId, type, logo, description, address, categories, subscripe} = req.body;

    try {

        const verifyPhoneNumber = await Shop.findOne({ phoneNumber: phoneNumber })
        if (verifyPhoneNumber) {
            return res.status(403).json({
                message: "رقم الهاتف هذا مسجل بالفعل"
            })
        } else {
            const shopId = uuidv4();
            bcrypt.hash(password, 10)
                    .then((hash) => {
                        const shop = new Shop({
                            shopId,
                            name,
                            phoneNumber,
                            password: hash,
                            ownerName,
                            ownerId,
                            type,
                            logo,
                            description,
                            address: {
                                addressId: address._id,
                                details: address.details
                            },
                            category: categories,
                            subscripe : {
                                type: subscripe.type,
                                startDate: subscripe.startDate,
                                endDate: subscripe.endDate,
                                status: subscripe.status
                            }
                        })

                        shop.save()
                            .then(() => {
                                return res.status(200).json({
                                    message: 'تم إنشاء المتجر بنجاح',
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

    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        })
    }
}

const updateShop = async (req, res) => {

}

const deleteShop = async (req, res) => {

}


const getShopsCategory = async (req, res) => {
    try {
        const shopsCategory = await ShopCategory.find({});

        return res.status(200).json(shopsCategory)
    }
    catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        })
    }
}

const getShopCategoryById = async (req, res) => {
    const { shcid } = req.params
    try {
        
        const shopCategory = await ShopCategory.findOne({_id : shcid});
        if(!shopCategory) {
            return res.status(404).json({"message" : "لم يتم العثور على القسم"})
        }

        return res.status(200).json({shopCategory})

    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        })
    }
}

const createShopCategory = async (req, res) => {
    const {name} = req.body;

    try {
        const existName = await ShopCategory.findOne({name: name});
        if(existName) {
            return req.status(400).json({"message" : "هذا الاسم موجود مسبقا"})
        }

        const category = await ShopCategory({name : name});

        category.save()
                .then(() => {
                    return res.status(201).json({
                        success: true,
                        shopCategory : category
                    })
                })
                .catch((error) => {
                    return res.status(412).send({
                        success: false,
                        message: error.message
                    })
                })
    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        })
    }
}

const updateShopCategory = async (req, res) => {
    const { shcid } = req.params;
    const { name } = req.body;

    try {
        const shopCategory = await ShopCategory.findOneAndUpdate(
            { _id: shcid },
            { name: name },
            { new: true }
        );

        if (!shopCategory) {
            return res.status(404).json({ message: "لم يتم العثور على القسم" });
        }

        return res.status(200).json({ shopCategory });
    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        });
    }
}

const deleteShopCategory = async (req, res) => {
    const { shcid } = req.params;

    try {
        const shopWithCategory = await Shop.findOne({ category: { $in: [shcid] } });
        if (shopWithCategory) {
            return res.status(400).json({ message: "لا يمكن حذف القسم لأنه مرتبط بمتجر واحد أو أكثر" });
        }
        const shopCategory = await ShopCategory.findOneAndDelete({ _id: shcid });

        if (!shopCategory) {
            return res.status(404).json({ message: "لم يتم العثور على القسم" });
        }

        return res.status(200).json({ message: "تم حذف القسم بنجاح" });
    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    addAddress,
    createShop,
    updateShop,
    deleteShop,
    getShopsCategory,
    getShopCategoryById,
    createShopCategory,
    updateShopCategory,
    deleteShopCategory
}