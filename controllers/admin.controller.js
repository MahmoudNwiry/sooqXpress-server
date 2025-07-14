const Address = require('../models').Address
const Shop = require('../models').Shop
const ShopCategory = require('../models').ShopCategory
const Category = require('../models').Category
const SubCategory = require('../models').SubCategory
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs')
const { getViewUrl } = require('../s3')

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
    const {name, phoneNumber, password, ownerName, ownerId, type, description, address, category, subscripe} = req.body;

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
                            logo: 'public/placeholder/logo.png',
                            description,
                            address: {
                                addressId: address.addressId,
                                details: address.details
                            },
                            category: category,
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

const getAllShops = async (req, res) => {
    try {
        const shops = await Shop.find({}).populate('category').populate('address.addressId').populate('subscripe.type').select('-password -__v');

        if (!shops || shops.length === 0) {
            return res.status(404).json({ message: "لا توجد متاجر" });
        }

        for (const shop of shops) {
            if (shop.logo) {
                shop.logo = await getViewUrl(shop.logo);
            }
        }

        return res.status(200).json(shops);
    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        });
    }
}

const getShopById = async (req, res) => {
    const { shopId } = req.params;
    try {
        const shop = await Shop.find({ shopId: shopId })
            .populate('category')
            .populate('address.addressId')
            .populate('subscripe.type')
            .select('-password -__v');
        if (!shop || shop.length === 0) {
            return res.status(404).json({ message: "لم يتم العثور على المتجر"});
        }
        if (shop[0].logo) {
            shop[0].logo = await getViewUrl(shop[0].logo);
        }
        return res.status(200).json(shop[0]);
    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        });
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


const createProductCategory = async (req, res) => {
    const { name, image } = req.body;
    try {
        const existName = await Category.findOne({name: name});
        if(existName) {
            return req.status(400).json({"message" : "هذا الاسم موجود مسبقا"})
        }

        const category = await Category({name, image});

        category.save()
                .then(() => {
                    return res.status(201).json({
                        success: true,
                        category : category
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
        });
    }
}

const getAllProductCategories = async (req, res) => {
    try {
        const categories = await Category.find({});

        if (!categories || categories.length === 0) {
            return res.status(404).json({ message: "لا توجد أقسام" });
        }

        return res.status(200).json(categories);
    }
    catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        });
    }
}


const getProductCategoryById = async (req, res) => {
    const { cid } = req.params;
    try {
        const category = await Category.findOne({_id : cid});
        if(!category) {
            return res.status(404).json({"message" : "لم يتم العثور على القسم"})
        }

        return res.status(200).json({category})

    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        })
    }
}

const updateProductCategory = async (req, res) => {
    const { cid } = req.params;
    const { name, image } = req.body;
    try {
        const category = await Category.findOneAndUpdate(
            { _id: cid },
            { name: name, image: image },
            { new: true }
        );

        if (!category) {
            return res.status(404).json({ message: "لم يتم العثور على القسم" });
        }

        return res.status(200).json({ category });
    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        });
    }
}

const deleteProductCategory = async (req, res) => {
    const { cid } = req.params;
    try {
        const subCategoryWithCategory = await SubCategory.findOne({ categoryId: cid });
        if (subCategoryWithCategory) {
            return res.status(400).json({ message: "لا يمكن حذف القسم لأنه مرتبط بفئة فرعية واحدة أو أكثر" });
        }
        const category = await Category.findOneAndDelete({ _id: cid });

        if (!category) {
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

const createProductSubCategory = async (req, res) => {
    const { name, image, mainCategory } = req.body;
    try {
        const existName = await SubCategory.findOne({name: name});
        if(existName) {
            return req.status(400).json({"message" : "هذا الاسم موجود مسبقا"})
        }

        const subcategory = await SubCategory({name, image, categoryId: mainCategory});

        subcategory.save()
                .then(() => {
                    return res.status(201).json({
                        success: true,
                        subcategory : subcategory
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
        });
    }
}

const getAllProductSubCategories = async (req, res) => {
    try {
        const subcategories = await SubCategory.find({}).populate('categoryId', 'name image _id');

        if (!subcategories || subcategories.length === 0) {
            return res.status(404).json({ message: "لا توجد فئات فرعية" });
        }

        return res.status(200).json(subcategories);
    }
    catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        });
    }
}

const getProductSubCategoryById = async (req, res) => {
    const { scid } = req.params;
    try {
        const subcategory = await SubCategory.findOne({_id : scid}).populate('categoryId', 'name image _id');
        if(!subcategory) {
            return res.status(404).json({"message" : "لم يتم العثور على الفئة الفرعية"})
        }

        return res.status(200).json({subcategory})

    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        })
    }
}

const updateProductSubCategory = async (req, res) => {
    const { scid } = req.params;
    const { name, image } = req.body;
    try {
        const subcategory = await SubCategory.findOneAndUpdate(
            { _id: scid },
            { name: name, image: image },
            { new: true }
        );

        if (!subcategory) {
            return res.status(404).json({ message: "لم يتم العثور على الفئة الفرعية" });
        }

        return res.status(200).json({ subcategory });
    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        });
    }
}

const deleteProductSubCategory = async (req, res) => {
    const { scid } = req.params;
    try {
        const subcategory = await SubCategory.findOneAndDelete({ _id: scid });

        if (!subcategory) {
            return res.status(404).json({ message: "لم يتم العثور على الفئة الفرعية" });
        }

        return res.status(200).json({ message: "تم حذف الفئة الفرعية بنجاح" });
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
    getAllShops,
    getShopById,
    updateShop,
    deleteShop,
    getShopsCategory,
    getShopCategoryById,
    createShopCategory,
    updateShopCategory,
    deleteShopCategory,
    createProductCategory,
    getAllProductCategories,
    getProductCategoryById,
    updateProductCategory,
    deleteProductCategory,
    createProductSubCategory,
    getAllProductSubCategories,
    getProductSubCategoryById,
    updateProductSubCategory,
    deleteProductSubCategory
}