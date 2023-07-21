import { NextFunction, Request, Response } from 'express';
const User = require('../models/user')
const { createSecretToken } = require('../utils/token')

module.exports.Register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await User.create({
            email: email,
            password: password
        })
        const token = createSecretToken(user._id)
        console.log(token)
        res.cookie("token", token, {
            httpOnly: false
        });
        res
            .status(201)
            .json({ message: "User signed in successfully", success: true, user });
        next();
    } catch (error) {
        console.log(error)
    }
}