const Role = require("../models").Role
const SubscriptionPlan = require('../models').SubscriptionPlan

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
                return res.status(201).json({"message" : "تم إنشاء الرتبة بنجاح"})
            })
            .catch(error => {
                return res.status(500).json({"message" : error})
            })
    } catch (error) {
        return res.status(500).json({"message" : error})
    }
}




const getAllSubscriptionPlans = async (req, res) => {
    try {

        const plans = await SubscriptionPlan.find();

        res.status(200).json(plans)
        
    } catch (error) {
        return res.status(500).json({"message" : error})
    }
}

const getSubscriptionPlanById = async (req, res) => {
    const {spid} = req.params
    try {

        const plan = await SubscriptionPlan.findOne({_id : spid});

        if(!plan) {
            return res.status(404).json({"message" : "لم يتم العثور على الخطة!"});
        }

        return res.status(200).json(plan);

    } catch (error) {
        return res.status(500).json({"message" : error})
    }
}


const createSubscriptionPlans = async (req, res) => {
    const {name, price, duration, features, limits} = req.body

    try {
        const subscriptionPlan = await SubscriptionPlan({
            name: name,
            price: price,
            duration: duration,
            features: features || [],
            limits: limits || {products: 0, offers : 0}
        })

        subscriptionPlan.save()
                        .then(() => {
                            return res.status(201).json({"message" : "تم إنشاء خطة الاشتراك بنجاح"})
                        })
                        .catch(error => {
                            return res.status(500).json({"message" : error})
                        })
    }
    catch (error) {
        return res.status(500).json({"message" : error})
    }

}

const updateSubscriptionPlan = async (req, res) => {
    
    const {spid} = req.params

    
    try {
        let plan = await SubscriptionPlan.findOne({_id : spid});

        if(!plan) {
            return res.status(404).json({"message" : "لم يتم العثور على خطة"});
        }        

        plan.name = req.body.name || plan.name
        plan.price = req.body.price || plan.price
        plan.duration = req.body.duration || plan.duration
        plan.features = req.body.features || plan.features
        plan.limits = {
            products : req.body.limits?.products || plan.limits.products,
            offers : req.body.limits?.offers || plan.limits.offers
        }
        
        plan.save().then(() => {
            return res.status(200).json({"message" : "تم التعديل بنجاح", "response" : plan})
        })
        .catch((error) => {
            return res.status(500).json({"message" : error})
        })

    } catch (error) {
        return res.status(500).json({"message" : error})
    }
}

module.exports = {
    createRole,
    getAllSubscriptionPlans,
    getSubscriptionPlanById,
    createSubscriptionPlans,
    updateSubscriptionPlan,
}