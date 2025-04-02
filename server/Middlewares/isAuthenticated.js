const jwt = require('jsonwebtoken');
const Joi = require('joi');
const SECRET_KEY = process.env.JWT_SECRET;

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(6).max(100).required().email(),
        password: Joi.string().min(8).max(100).required(),
        number:Joi.string().min(10).max(10).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }
    next();
}

const loginValidation = (req, res, next) =>{
    const schema = Joi.object({
        email: Joi.string().min(6).max(100).required().email(),
        password: Joi.string().min(8).max(100).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
        }
        next();
}

const isAuthenticated = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ success: false, message: 'Token is not valid' });
    }
};
module.exports = { signupValidation, loginValidation,  isAuthenticated };