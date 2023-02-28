const Joi = require("joi");
const { isValidObjectId } = require("mongoose");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string()
        .pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        .required(),
      phone: Joi.string().min(3).max(30).required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res
        .status(400)
        .json({ message: validationResult.error.details[0].message });
    }

    next();
  },

  updateContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string()
        .pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        .required(),
      phone: Joi.string().required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details });
    }

    next();
  },

  updateStatusContactValidation: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.boolean().required(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details });
    }

    next();
  },

  objectIdValidation: (req, res, next) => {
    if (!isValidObjectId(req.params.contactId)) {
      return res
        .status(400)
        .json({ message: `${req.params.contactId} is not correct` });
    }

    next();
  },
};
