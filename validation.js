//VALIDATION
const Joi = require("@hapi/joi")

//Register Validation
const registerValidation = data => {
  const schema = Joi.object({
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  })

  return schema.validate(data)
}

//Login Validation
const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  })

  return schema.validate(data)
}

const addressValidation = data => {
  const schema = Joi.object({
    street: Joi.string().min(10).required(),
    locality: Joi.string().min(10).required(),
    city: Joi.string().min(3).required(),
    country: Joi.string().min(7).required(),

  })
}


module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.addressValidation = addressValidation
