import { NextFunction, Request, Response } from 'express';
import { generateToken } from '../utils/token';
import { UserModel } from '../models/user';
const bcrypt = require('bcrypt');

module.exports.Register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const addUser = async (firstName: string, lastName: string, phoneNumber: string, email: string, password: string, avatar: string) => {
            const user = await UserModel.create({
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
        const user = await UserModel.findOne({ email });
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

module.exports.Profile = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findById(req.user._id)
        if (user) {
            user.firstName = req.body.firstName || user.firstName
            user.lastName = req.body.lastName || user.lastName
            user.email = req.body.email || user.email
            user.avatar = req.body.avatar || user.avatar
            user.phoneNumber = req.body.phoneNumber || user.phoneNumber
            const updatedUser = await user.save()
            res.send({
                _id: updatedUser._id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                avatar: updatedUser.avatar,
                phoneNumber: updatedUser.phoneNumber,
            })
        }
    } catch (error) {
        res.json({ "message": error })
    }
}

module.exports.getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find({});
        res.status(200).send(users)
    } catch (error) {
        res.status(400).json({ message: 'Sometwing went wrong!' })
    }
}

module.exports.deleteUser = async (req: Request, res: Response) => {
    const user = await UserModel.findById(req.params.id)
    if (user) {
        if (user.email === 'tolga@mail.com') {
            res.status(400).send({ message: 'You can not delete admin account!' })
            return
        }
        const deletedUser = await user.deleteOne()
        res.json({ message: 'success', user: deletedUser})
    }
    else {
        res.status(404).send({ message: 'User not found!' })
    }
}