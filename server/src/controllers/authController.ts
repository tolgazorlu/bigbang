import { NextFunction, Request, Response } from 'express';
import { userModel } from '../models/user';
const bcrypt = require('bcrypt');
const { createSecretToken } = require('../utils/token')

module.exports.Register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body
        const existingUser = await userModel.findOne({ email })
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
        const addUser = async (firstName: string, lastName: string, phoneNumber: string, email: string, password: string, avatar: string) => {
            const user = await userModel.create({
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                email: email,
                password: password,
                avatar: avatar
            })
        }
        addUser(req.body.firstName, req.body.lastName, req.body.phoneNumber, req.body.email, req.body.password, req.body.avatar)
        res
                .status(201)
                .json({ message: "User signed in successfully", success: true });
        next();
    } catch (error) {
        console.log(error)
    }
}

module.exports.Login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: 'All fields are required!' })
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ message: 'Incorrect password or invalid' })
        }
        const auth = await bcrypt.compare(password, user.password)
        if (!auth) {
            return res.json({ message: 'Incorrect password or email' })
        }
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            httpOnly: false,
        });
        res.status(201).json({ message: "User logged in successfully", success: true });
        next()
    } catch (error) {
        console.log(error)
    }
}