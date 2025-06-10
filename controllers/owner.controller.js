const Role = require("../models").Role

const createRole = async (req, res) => {
    const {name, nameAr, description, permissions} = req.body
    try {
        const role = await Role({
            name: name,
            nameAr: nameAr,
            description: description,
            permissions: permissions || []
        })

        role.save()
            .then(() => {
                return res.status(201).json({message : "تم إنشاء الرتبة بنجاح"})
            })
            .catch(error => {
                return res.status(500).json({error : error})
            })
    } catch (error) {
        return res.status(500).json({error : error})
    }
}

module.exports = {
    createRole
}