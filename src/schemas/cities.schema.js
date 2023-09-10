import joi from 'joi';

export const citySchema = joi.object({
    name:joi.string().min(3).max(100).required(),
});



