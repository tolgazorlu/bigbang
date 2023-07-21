import express, { Response, Request } from 'express'
const User = require('../models/user');

exports.createUser = async (req: Request, res: Response) => {
    try {
        const addUser = async (email: String, phoneNumber: String, firstName: String, lastName: String, password: String, avatar: String) => {
            await User.create({
                email: email,
                phoneNumber: phoneNumber,
                firstName: firstName,
                lastName: lastName,
                password: password,
                avatar: avatar
            });
        }

        addUser(req.body.email, req.body.phoneNumber, req.body.firstName, req.body.lastName, req.body.password, req.body.avatar);

        res.status(200).json(
            {
                'success': 'true'
            }
        );
    }
    catch (err) {
        res.status(400).json({
            'succcess': 'fail'
        })
    }

}

exports.getUser = async (req: Request, res: Response) => {
    try {
        const user = await User.find({})
        res.status(200).json(user);
    }
    catch (err) {
        res.status(400).json({
            'succcess': 'fail'
        })
    }
}