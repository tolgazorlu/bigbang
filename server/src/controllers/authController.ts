import { NextFunction, Request, Response } from 'express';
import { userModel } from '../models/user';
import { generateToken } from '../utils/token';
const bcrypt = require('bcrypt');

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
            return user
        }
        const newUser = await addUser(req.body.firstName, req.body.lastName, req.body.phoneNumber, req.body.email, req.body.password, req.body.avatar)
        res
            .status(201)
            .json({ 
                _id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                phoneNumber: newUser.phoneNumber,
                email: newUser.email,
                avatar: newUser.avatar,
                isAdmin: newUser.isAdmin,
                token: generateToken(newUser)
             });
        
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
        res.status(201).json({ 
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            avatar: user.avatar,
            token: generateToken(user)
         });
        next()
    } catch (error) {
        console.log(error)
    }
}