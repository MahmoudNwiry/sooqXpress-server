const express = require("express");
const router = express.Router();

const {verifyToken} = require("../middlewares/auth.middleware"); 
const { isOwner } = require("../middlewares/permisions.middleware");
const { 
    createRole, 
    createSubscriptionPlans, 
    getSubscriptionPlanById, 
    getAllSubscriptionPlans, 
    updateSubscriptionPlan 
} = require("../controllers/owner.controller");
const { roleValidation, subscriptionPlanValidation, updateSubscriptionPlanValidation } = require("../middlewares/validation.middleware");

router.post('/roles', [verifyToken, isOwner, roleValidation], createRole); // check

router.get('/subscription-plan', [verifyToken, isOwner], getAllSubscriptionPlans);  // check
router.get('/subscription-plan/:spid', [verifyToken, isOwner], getSubscriptionPlanById); // check
router.post('/subscription-plan', [verifyToken, isOwner, subscriptionPlanValidation], createSubscriptionPlans); // check
router.put('/subscription-plan/:spid', [verifyToken, isOwner, updateSubscriptionPlanValidation], updateSubscriptionPlan); // check
// router.delete('/subscription-plan/:spid', [verifyToken, isOwner], deleteSubscriptionPlan); // check

module.exports = router
