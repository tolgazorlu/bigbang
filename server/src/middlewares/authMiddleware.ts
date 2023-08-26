import { Request, Response } from 'express';
const jwt = require('jsonwebtoken')
const User = require('../models/user')
require("dotenv").config();

module.exports.UserVerification = (req: Request, res: Response) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err: Error, data: any) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await User.findById(data.id)
      if (user) return res.json({ status: true, user: user.email })
      else return res.json({ status: false })
    }
  })
}