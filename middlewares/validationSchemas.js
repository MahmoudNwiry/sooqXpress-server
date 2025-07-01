const Joi = require('joi');


const SignUpSchema = Joi.object({
    firstName: Joi.string().min(2).max(50).required().messages({
        'string.base': 'الاسم الأول يجب أن يكون نصًا',
        'string.empty': 'الاسم الأول لا يمكن أن يكون فارغًا',
        'string.min': 'الاسم الأول يجب أن يحتوي على حرفين على الأقل',
        'string.max': 'الاسم الأول يجب ألا يتجاوز 50 حرفًا',
        'any.required': 'الاسم الأول مطلوب'
    }),
    lastName: Joi.string().min(2).max(50).required().messages({
        'string.base': 'الاسم الأخير يجب أن يكون نصًا',
        'string.empty': 'الاسم الأخير لا يمكن أن يكون فارغًا',
        'string.min': 'الاسم الأخير يجب أن يحتوي على حرفين على الأقل',
        'string.max': 'الاسم الأخير يجب ألا يتجاوز 50 حرفًا',
        'any.required': 'الاسم الأخير مطلوب'
    }),
    password: Joi.string().min(8).max(50).required().messages({
        'string.base': 'كلمة المرور يجب أن تكون نصًا',
        'string.empty': 'كلمة المرور لا يمكن أن تكون فارغة',
        'string.min': 'كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل',
        'string.max': 'كلمة المرور يجب ألا تتجاوز 50 حرفًا',
        'any.required': 'كلمة المرور مطلوبة'
    }),
    phoneNumber: Joi.string().pattern(/^(059|056)\d{7}$/).required().messages({
        'string.base': 'رقم الهاتف يجب أن يكون نصًا',
        'string.empty': 'رقم الهاتف لا يمكن أن يكون فارغًا',
        'string.pattern.base': 'رقم الهاتف يجب أن يبدأ بـ 059 أو 056 ويتكون من 10 أرقام',
        'any.required': 'رقم الهاتف مطلوب'
    }),
    avatar: Joi.string().uri().optional().messages({
        'string.base': 'الصورة الرمزية يجب أن تكون رابطًا',
        'string.uri': 'الصورة الرمزية يجب أن تكون رابطًا صالحًا'
    }),
    role: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional().messages({
        'string.base': 'يجب عليك إدخال id للرتبة',
        'string.pattern.base': 'يجب أن يكون id الرتبة صالح'
    })
});


const AddressSchema = Joi.object({
    addressId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.base': 'معرف العنوان يجب أن يكون نصًا',
        'string.empty': 'معرف العنوان لا يمكن أن يكون فارغًا',
        'string.pattern.base': 'معرف العنوان يجب أن يكون معرفًا صالحًا',
        'any.required': 'معرف العنوان مطلوب'
    }),
    details: Joi.string().min(5).max(255).required().messages({
        'string.base': 'التفاصيل يجب أن تكون نصًا',
        'string.empty': 'التفاصيل لا يمكن أن تكون فارغة',
        'string.min': 'التفاصيل يجب أن تحتوي على 5 أحرف على الأقل',
        'string.max': 'التفاصيل يجب ألا تتجاوز 255 حرفًا',
        'any.required': 'التفاصيل مطلوبة'
    }),
    isDefault: Joi.boolean().optional().messages({
        'boolean.base': 'يجب أن يكون الافتراضي صحيحًا أو خاطئًا'
    })
});

const updateAddressSchema = Joi.object({
    isDefault: Joi.boolean().optional().messages({
        'boolean.base': 'يجب أن يكون الافتراضي صحيحًا أو خاطئًا'
    }),
    details: Joi.string().min(5).max(255).optional().messages({
        'string.base': 'التفاصيل يجب أن تكون نصًا',
        'string.empty': 'التفاصيل لا يمكن أن تكون فارغة',
        'string.min': 'التفاصيل يجب أن تحتوي على 5 أحرف على الأقل',
        'string.max': 'التفاصيل يجب ألا تتجاوز 255 حرفًا'
    })
});

const MainAddressSchema = Joi.object({
    country : Joi.string().min(2).max(50).required().messages({
        'string.base': 'البلد يجب أن يكون نصًا',
        'string.empty': 'البلد لا يمكن أن يكون فارغًا',
        'string.min': 'البلد يجب أن يحتوي على حرفين على الأقل',
        'string.max': 'البلد يجب ألا يتجاوز 50 حرفًا',
        'any.required': 'البلد مطلوب'
    }),
    city : Joi.string().min(2).max(50).required().messages({
        'string.base': 'المدينة يجب أن تكون نصًا',
        'string.empty': 'المدينة لا يمكن أن تكون فارغة',
        'string.min': 'المدينة يجب أن تحتوي على حرفين على الأقل',
        'string.max': 'المدينة يجب ألا تتجاوز 50 حرفًا',
        'any.required': 'المدينة مطلوبة'
    }),
    area : Joi.string().min(2).max(50).required().messages({
        'string.base': 'المنطقة يجب أن تكون نصًا',
        'string.empty': 'المنطقة لا يمكن أن تكون فارغة',
        'string.min': 'المنطقة يجب أن تحتوي على حرفين على الأقل',
        'string.max': 'المنطقة يجب ألا تتجاوز 50 حرفًا',
        'any.required': 'المنطقة مطلوبة'
    }),
    governorate : Joi.string().min(2).max(50).required().messages({
        'string.base': 'المحافظة يجب أن تكون نصًا',
        'string.empty': 'المحافظة لا يمكن أن تكون فارغة',
        'string.min': 'المحافظة يجب أن تحتوي على حرفين على الأقل',
        'string.max': 'المحافظة يجب ألا تتجاوز 50 حرفًا',
        'any.required': 'المحافظة مطلوبة'
    }),
    deliveryPrice : Joi.number().min(0).required().messages({
        'number.base': 'سعر التوصيل يجب أن يكون رقمًا',
        'number.min': 'سعر التوصيل يجب أن يكون 0 أو أكثر',
        'any.required': 'سعر التوصيل مطلوب'
    })
});

const ShopCategorySchema = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
        'string.base': 'اسم الفئة يجب أن يكون نصًا',
        'string.empty': 'اسم الفئة لا يمكن أن يكون فارغًا',
        'string.min': 'اسم الفئة يجب أن يحتوي على حرفين على الأقل',
        'string.max': 'اسم الفئة يجب ألا يتجاوز 50 حرفًا',
        'any.required': 'اسم الفئة مطلوب'
    })
});

const ShopSchema = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
        'string.base': 'اسم المتجر يجب أن يكون نصًا',
        'string.empty': 'اسم المتجر لا يمكن أن يكون فارغًا',
        'string.min': 'اسم المتجر يجب أن يحتوي على حرفين على الأقل',
        'string.max': 'اسم المتجر يجب ألا يتجاوز 50 حرفًا',
        'any.required': 'اسم المتجر مطلوب'
    }),
    phoneNumber: Joi.string().pattern(/^(059|056)\d{7}$/).required().messages({
        'string.base': 'رقم الهاتف يجب أن يكون نصًا',
        'string.empty': 'رقم الهاتف لا يمكن أن يكون فارغًا',
        'string.pattern.base': 'رقم الهاتف يجب أن يبدأ بـ 059 أو 056 ويتكون من 10 أرقام',
        'any.required': 'رقم الهاتف مطلوب'
    }),
    password: Joi.string().min(8).max(50).required().messages({
        'string.base': 'كلمة المرور يجب أن تكون نصًا',
        'string.empty': 'كلمة المرور لا يمكن أن تكون فارغة',
        'string.min': 'كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل',
        'string.max': 'كلمة المرور يجب ألا تتجاوز 50 حرفًا',
        'any.required': 'كلمة المرور مطلوبة'
    }),
    ownerName: Joi.string().min(2).max(50).required().messages({
        'string.base': 'اسم المالك يجب أن يكون نصًا',
        'string.empty': 'اسم المالك لا يمكن أن يكون فارغًا',
        'string.min': 'اسم المالك يجب أن يحتوي على حرفين على الأقل',
        'string.max': 'اسم المالك يجب ألا يتجاوز 50 حرفًا',
        'any.required': 'اسم المالك مطلوب'
    }),
    ownerId: Joi.string().pattern(/^[1-9][0-9]{8}$/).required().messages({
        'string.base': 'معرف المالك يجب أن يكون نصًا',
        'string.empty': 'معرف المالك لا يمكن أن يكون فارغًا',
        'string.pattern.base': 'معرف المالك يجب أن يكون رقم هوية مكون من 9 أرقام ويبدأ برقم من 1 إلى 9',
        'any.required': 'معرف المالك مطلوب'
    }),
    type: Joi.string().valid('متجر الكتروني', 'متجر طبيعي').required().messages({
        'string.base': 'نوع المتجر يجب أن يكون نصًا',
        'any.only': 'نوع المتجر يجب أن يكون "متجر الكتروني" أو "متجر إلكتروني" فقط',
        'any.required': 'نوع المتجر مطلوب'
    }),
    logo: Joi.string().uri().optional().messages({
        'string.base': 'شعار المتجر يجب أن يكون رابطًا',
        'string.uri': 'شعار المتجر يجب أن يكون رابطًا صالحًا'
    }),
    description: Joi.string().min(5).max(255).optional().messages({
        'string.base': 'وصف المتجر يجب أن يكون نصًا',
        'string.empty': 'وصف المتجر لا يمكن أن يكون فارغًا',
        'string.min': 'وصف المتجر يجب أن يحتوي على 5 أحرف على الأقل',
        'string.max': 'وصف المتجر يجب ألا يتجاوز 255 حرفًا'
    }),
    address: Joi.object({
        addressId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
            'string.base': 'معرف العنوان يجب أن يكون نصًا',
            'string.empty': 'معرف العنوان لا يمكن أن يكون فارغًا',
            'string.pattern.base': 'معرف العنوان يجب أن يكون معرفًا صالحًا',
            'any.required': 'معرف العنوان مطلوب'
        }),
        details: Joi.string().min(5).max(255).required().messages({
            'string.base': 'التفاصيل يجب أن تكون نصًا',
            'string.empty': 'التفاصيل لا يمكن أن تكون فارغة',
            'string.min': 'التفاصيل يجب أن تحتوي على 5 أحرف على الأقل',
            'string.max': 'التفاصيل يجب ألا تتجاوز 255 حرفًا',
            'any.required': 'التفاصيل مطلوبة'
        })
    }).required(),
    category: Joi.array()
        .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/).messages({
            'string.pattern.base': 'كل فئة يجب أن يكون id صالح'
        }))
        .required()
        .messages({
            'array.base': 'الفئات يجب أن تكون مصفوفة من id',
            'any.required': 'الفئات مطلوبة'
        }),
    subscripe: Joi.object({
        type: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
            'string.base': 'نوع الاشتراك يجب أن يكون id صالح',
            'string.pattern.base': 'نوع الاشتراك يجب أن يكون id صالح',
            'any.required': 'نوع الاشتراك مطلوب'
        }),
        startDate: Joi.date().required().messages({
            'date.base': 'تاريخ البدء يجب أن يكون تاريخًا صالحًا',
            'any.required': 'تاريخ البدء مطلوب'
        }),
        endDate: Joi.date().required().messages({
            'date.base': 'تاريخ الانتهاء يجب أن يكون تاريخًا صالحًا',
            'any.required': 'تاريخ الانتهاء مطلوب'
        }),
        status: Joi.string().valid('active', 'expired', 'canceled').required().messages({
            'string.base': 'حالة الاشتراك يجب أن تكون نصًا',
            'any.only': 'حالة الاشتراك يجب أن تكون "active" أو "expired" أو "canceled"',
            'any.required': 'حالة الاشتراك مطلوبة'
        })
    }).required()
});

const RoleSchema = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
        'string.base': 'اسم الرتبة يجب أن يكون نصًا',
        'string.empty': 'اسم الرتبة لا يمكن أن يكون فارغًا',
        'string.min': 'اسم الرتبة يجب أن يحتوي على حرفين على الأقل',
        'string.max': 'اسم الرتبة يجب ألا يتجاوز 50 حرفًا',
        'any.required': 'اسم الرتبة مطلوب'
    }),
    nameAr: Joi.string()
        .pattern(/^[\u0600-\u06FF0-9 ]+$/)
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.base': 'اسم الرتبة باللغة العربية يجب أن يكون نصًا',
            'string.empty': 'اسم الرتبة باللغة العربية لا يمكن أن يكون فارغًا',
            'string.min': 'اسم الرتبة باللغة العربية يجب أن يحتوي على حرفين على الأقل',
            'string.max': 'اسم الرتبة باللغة العربية يجب ألا يتجاوز 50 حرفًا',
            'string.pattern.base': 'اسم الرتبة باللغة العربية يجب أن يحتوي على حروف عربية وأرقام فقط',
            'any.required': 'اسم الرتبة باللغة العربية مطلوب'
        }),
    description: Joi.string().min(5).max(255).required().messages({
        'string.base': 'وصف الرتبة يجب أن يكون نصًا',
        'string.empty': 'وصف الرتبة لا يمكن أن يكون فارغًا',
        'string.min': 'وصف الرتبة يجب أن يحتوي على 5 أحرف على الأقل',
        'string.max': 'وصف الرتبة يجب ألا يتجاوز 255 حرفًا',
        'any.required': 'وصف الرتبة مطلوب'
    }),
    permissions: Joi.array()
        .items(
            Joi.string().pattern(/^[0-9a-fA-F]{24}$/).messages({
                'string.pattern.base': 'كل إذن يجب أن يكون id صالح'
            })
        )
        .optional()
        .messages({
            'array.base': 'الصلاحيات يجب أن تكون مصفوفة من id'
        })
});

const SubscriptionPlanSchema = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
        'string.base': 'اسم الخطة يجب أن يكون نصًا',
        'string.empty': 'اسم الخطة لا يمكن أن يكون فارغًا',
        'string.min': 'اسم الخطة يجب أن يحتوي على حرفين على الأقل',
        'string.max': 'اسم الخطة يجب ألا يتجاوز 50 حرفًا',
        'any.required': 'اسم الخطة مطلوب'
    }),
    price: Joi.number().min(0).required().messages({
        'number.base': 'السعر يجب أن يكون رقمًا',
        'number.min': 'السعر يجب أن يكون 0 أو أكثر',
        'any.required': 'السعر مطلوب'
    }),
    duration: Joi.string().valid('يومي', 'إسبوعي', 'شهري', 'سنوي').required().messages({
        'string.base': 'مدة الاشتراك يجب أن تكون نصًا',
        'any.only': 'مدة الاشتراك يجب أن تكون "يومي" أو "إسبوعي" أو "شهري" أو "سنوي"',
        'any.required': 'مدة الاشتراك مطلوبة'
    }),
    features: Joi.array()
        .items(Joi.string().min(2).max(255))
        .optional()
        .messages({
            'array.base': 'المميزات يجب أن تكون مصفوفة من نصوص',
            'string.base': 'كل ميزة يجب أن تكون نصًا',
            'string.min': 'كل ميزة يجب أن تحتوي على حرفين على الأقل',
            'string.max': 'كل ميزة يجب ألا تتجاوز 255 حرفًا'
        })
});

const UpdateSubscriptionPlanSchema = Joi.object({
    name: Joi.string().min(2).max(50).optional().messages({
        'string.base': 'اسم الخطة يجب أن يكون نصًا',
        'string.empty': 'اسم الخطة لا يمكن أن يكون فارغًا',
        'string.min': 'اسم الخطة يجب أن يحتوي على حرفين على الأقل',
        'string.max': 'اسم الخطة يجب ألا يتجاوز 50 حرفًا'
    }),
    price: Joi.number().min(0).optional().messages({
        'number.base': 'السعر يجب أن يكون رقمًا',
        'number.min': 'السعر يجب أن يكون 0 أو أكثر'
    }),
    duration: Joi.string().valid('يومي', 'إسبوعي', 'شهري', 'سنوي').optional().messages({
        'string.base': 'مدة الاشتراك يجب أن تكون نصًا',
        'any.only': 'مدة الاشتراك يجب أن تكون "يومي" أو "إسبوعي" أو "شهري" أو "سنوي"'
    }),
    features: Joi.array()
        .items(Joi.string().min(2).max(255))
        .optional()
        .messages({
            'array.base': 'المميزات يجب أن تكون مصفوفة من نصوص',
            'string.base': 'كل ميزة يجب أن تكون نصًا',
            'string.min': 'كل ميزة يجب أن تحتوي على حرفين على الأقل',
            'string.max': 'كل ميزة يجب ألا تتجاوز 255 حرفًا'
        })
});
        
module.exports = {
    SignUpSchema,
    AddressSchema,
    updateAddressSchema,
    MainAddressSchema,
    ShopCategorySchema,
    ShopSchema,
    RoleSchema,
    SubscriptionPlanSchema,
    UpdateSubscriptionPlanSchema
}