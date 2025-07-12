const { getViewUrl } = require("../s3");

const User = require("../models").User;
const Address = require("../models").Address;
const ShopCategory = require("../models").ShopCategory;
const Shop = require("../models").Shop;

const addUserAddress = async (req, res) => {
    const {addressId, details, isDefault} = req.body

    try {
        const user = await User.findOne({userId : req.userData.userId});

        if(!user) {
            return res.status(401).json({"message" : "لم يتم العثور على المستخدم"})
        }

        if(user.address.length >= 3) {
            return res.status(412).json({"message" : "لقد وصلت الحد الأقصى للعناوين"})
        }
        if(user.address.length === 0) {
            user.address.push({addressId, details, isDefault : true});
        } else {
            if (isDefault) {
                const defaultAdress = await user.address.find(adrs => adrs.isDefault);
                if(defaultAdress) {
                    defaultAdress.isDefault = false;
                    await user.save();
                }
            }
            user.address.push({addressId, details, isDefault});
        }
        await user.save();

        return res.status(200).json({"message" : "تم إضافة العنوان بنجاح"})
    }
    catch(error) {
        return res.status(412).json({error : error})
    }
}

const getAllAddresses = async (req, res) => {
    try {
        const user = await User.findOne({userId : req.userData.userId}).populate('address.addressId');

        if(!user) {
            return res.status(401).json({"message" : "لم يتم العثور على المستخدم"})
        }

        return res.status(200).json(user.address);
    } catch (error) {
        return res.status(412).json({error : error});
    }
}

const updateAddress = async (req, res) => {
    const {addressId} = req.params
    const {isDefault, details} = req.body
    try {
        const user = await User.findOne({userId : req.userData.userId});

        if(!user) {
            return res.status(401).json({"message" : "لم يتم العثور على المستخدم"})
        }
        

        const address = user.address.find(adrs => adrs._id.toString() === addressId);

        if(!address) {
            return res.status(404).json({"message" : "لم يتم العثور على العنوان"})
        }

        if (isDefault) {
            const defaultAdress = await user.address.find(adrs => adrs.isDefault);
            if(defaultAdress) {
                defaultAdress.isDefault = false;
                await user.save();
            }
        }
        
        address.details = details || address.details;
        address.isDefault = isDefault || address.isDefault;

        await user.save();

        return res.status(201).json({"message" : "تم تحديث العنوان"})
        
    } catch (error) {
        return res.status(412).json({error : error});
    }

}

const getAddressById = async (req, res) => {
    const {addressId} = req.params

    try {
        const user = await User.findOne({userId : req.userData.userId}).populate('address.addressId');

        if(!user) {
            return res.status(401).json({"message" : "لم يتم العثور على المستخدم"})
        }    
        
        const address = user.address.find(adrs => adrs._id.toString() === addressId);
        
        
        if(!address) {
            return res.status(404).json({"message" : "لم يتم العثور على العنوان"})
        }
        
        return res.status(200).json(address)
        
    }
    catch(error) {
        return res.status(412).json({error : error});
    }
}

const deleteAddress = async (req, res) => {
    const {addressId} = req.params

    try {
        const user = await User.findOne({userId : req.userData.userId});

        if(!user) {
            return res.status(401).json({"message" : "لم يتم العثور على المستخدم"})
        }    

        user.address = user.address.filter(addr => {
            if(addr._id.toString() === addressId)
                if (addr.isDefault) {
                    return res.status(403).json({"message" : "لا يمكن حذف العنوان الافتراضي"})
                }
            return addr._id.toString() !== addressId});
        await user.save();

        return res.status(200).json({"message" : "تم حذف العنوان بنجاح"})

    } catch (error) {
        return res.status(412).json({error : error});
    }
}

const getShippingAddress = async (req, res) => {
    try {
        const addresses = await Address.find({});
        return res.status(200).json(addresses)
    } catch (error) {
        return res.status(412).json({error : error});
    }
}


const getAllShopCategory = async (req, res) => {
    try {
        const categories = await ShopCategory.find();
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(412).json({error : error});
    }
}

const getAllShops = async (req, res) => {
    try {
        const shops = await Shop.find().populate('category').select('name category logo shopId');
        if (!shops || shops.length === 0) {
            return res.status(404).json({message: "لا توجد متاجر متاحة"});
        }
        
        // get image
        for (const shop of shops) {
            if (shop.logo) {
                shop.logo = await getViewUrl(shop.logo);
            }
        }

        return res.status(200).json(shops);
    } catch (error) {
        return res.status(412).json({error : error});
    }
}


module.exports = {
    addUserAddress,
    getAllAddresses,
    updateAddress,
    getAddressById,
    deleteAddress,
    getShippingAddress,
    getAllShopCategory,
    getAllShops
}