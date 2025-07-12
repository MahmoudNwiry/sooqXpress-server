const Shop = require('../models').Shop


const updateProfile = async (req, res) => {
    const { shopId } = req.shopData;
    const { description } = req.body;
    
    try {
        const shop = await Shop.findOne({ shopId : shopId });
        if (!shop) {
        return res.status(404).json({ message: 'لم يتم العثور على المتجر' });
        }
    
        shop.description = description || shop.description;
    
        await shop.save();
    
        return res.status(200).json({ message: 'تم تحديث بيانات المتجر بنجاح', shop });
    } catch (error) {
        console.error('خطأ اثناء تحديث المتجر:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const updateLogo = async (req, res) => {
    const { shopId } = req.shopData;
    const { logo } = req.body;

    try {
        const shop = await Shop.findOne({ shopId: shopId });
        if (!shop) {
            return res.status(404).json({ message: 'لم يتم العثور على المتجر' });
        }
        shop.logo = logo || shop.logo;
        await shop.save();
        return res.status(200).json({ message: 'تم تحديث شعار المتجر بنجاح', shop });
    }
    catch (error) {
        console.error('خطأ اثناء تحديث شعار المتجر:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const createProductByShop = async (req, res) => {
}

module.exports = {
    updateProfile,
    updateLogo
};