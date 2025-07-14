const { SignUpSchema, AddressSchema, updateAddressSchema, MainAddressSchema, ShopCategorySchema, RoleSchema, UpdateSubscriptionPlanSchema, SubscriptionPlanSchema, ShopSchema, shopUpdateLogoSchema, shopUpdateProfileSchema, categoryProductSchema, subCategoryProductSchema, updateProductCategorySchema, updateProductSubCategorySchema } = require("./validationSchemas");


const signUpValidation = (req, res, next) => {
    const { error } = SignUpSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(400).json({ errors: errorMessages });
    }

    next();
}

const addressValidation = (req, res, next) => {
    const { error } = AddressSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(400).json({ errors: errorMessages });
    }

    next();
}

const updateAddressValidation = (req, res, next) => {
    const { error } = updateAddressSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(400).json({ errors: errorMessages });
    }

    next();
}

const mainAddressVaidation = (req, res, next) => {
    const { error } = MainAddressSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(400).json({ errors: errorMessages });
    }

    next();
}

const shopCategoryValidation = (req, res, next) => {
    const { error } = ShopCategorySchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(400).json({ errors: errorMessages });
    }

    next();
}

const shopVaidation = (req, res, next) => {
    const { error } = ShopSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(400).json({ errors: errorMessages });
    }

    next();
}

const roleValidation = (req, res, next) => {
    const { error } = RoleSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(400).json({ errors: errorMessages });
    }

    next();
}

const subscriptionPlanValidation = (req, res, next) => {
    const { error } = SubscriptionPlanSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(400).json({ errors: errorMessages });
    }

    next();
}

const updateSubscriptionPlanValidation = (req, res, next) => {
    const { error } = UpdateSubscriptionPlanSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(400).json({ errors: errorMessages });
    }

    next();
}

const updateShopProfileValidation = (req, res, next) => {
    const { error } = shopUpdateProfileSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(400).json({ errors: errorMessages });
    }
    next();
}

const updateShopProfileLogoValidation = (req, res, next) => {
    const { error } = shopUpdateLogoSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(400).json({ errors: errorMessages });
    }
    next();
}

const createProductCategoryValidation = (req, res, next) => {
    const { error } = categoryProductSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(400).json({ errors: errorMessages });
    }
    next();
}

const updateProductCategoryValidation = (req, res, next) => {
    const { error } = updateProductCategorySchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(400).json({ errors: errorMessages });
    }
    next();
}

const createProductSubCategoryValidation = (req, res, next) => {
    const { error } = subCategoryProductSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(400).json({ errors: errorMessages });
    }
    next();
}

const updateProductSubCategoryValidation = (req, res, next) => {
    const { error } = updateProductSubCategorySchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(400).json({ errors: errorMessages });
    }
    next();
}

module.exports = {
    signUpValidation,
    addressValidation,
    updateAddressValidation,
    mainAddressVaidation,
    shopCategoryValidation,
    shopVaidation,
    roleValidation,
    subscriptionPlanValidation,
    updateSubscriptionPlanValidation,
    updateShopProfileValidation,
    updateShopProfileLogoValidation,
    createProductCategoryValidation,
    updateProductCategoryValidation,
    createProductSubCategoryValidation,
    updateProductSubCategoryValidation,
};