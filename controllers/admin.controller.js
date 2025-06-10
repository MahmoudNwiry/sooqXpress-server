const Address = require('../models').Address

const addAddress = async (req, res) => {
    const {country, city, governorate, area, deliveryPrice} = req.body;

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

module.exports = {
    addAddress
}