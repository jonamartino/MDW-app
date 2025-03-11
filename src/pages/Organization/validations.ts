// src/pages/Organization/validations.ts
import Joi from 'joi';

const addressSchema = Joi.object({
    street: Joi.string().min(3).max(250).required(),
    city: Joi.string().min(3).max(100).required(),
    state: Joi.string().min(3).max(100).required(),
    country: Joi.string().min(3).max(100).required()
});

const organizationUpdateValidationSchema = Joi.object({
  _id: Joi.string().hex().length(24).required(),
  name: Joi.string().min(3).max(250).required(),
  description: Joi.string().max(500).allow('').optional(),
  email: Joi.string().email({ tlds: { allow: false } }).optional(),
  phone: Joi.string().allow('').optional(),
  website: Joi.string().uri().allow('').optional(),
  logo: Joi.string().allow('').uri().optional(),
  address: addressSchema.optional()
}).options({ abortEarly: false });

const organizationCreateValidationSchema = Joi.object({
  name: Joi.string().min(3).max(250).required(),
  description: Joi.string().max(500).allow('').optional(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  phone: Joi.string().allow('').optional(),
  website: Joi.string().uri().allow('').optional(),
  logo: Joi.string().allow('').uri({allowRelative: true}).optional(),
  address: addressSchema.required()
}).options({ abortEarly: false });

export const validateOrganizationUpdate = (data: any): Joi.ValidationResult => {
  return organizationUpdateValidationSchema.validate(data);
};

export const validateOrganizationCreate = (data: any): Joi.ValidationResult => {
  return organizationCreateValidationSchema.validate(data);
};
