import chalk from "chalk"
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers
    if (authorization) {
        const token = authorization.slice(7, authorization.length) // Bearer xxxxx
        console.log(chalk.bgRed(token))
        const decode = jwt.verify(
            token,
            process.env.TOKEN_KEY || 'somethingsecret'
        )
        req.user = decode as {
            _id: string
            firstName: string
            lastName: string
            email: string
            isAdmin: boolean
            token: string
        }
        next()
    } else {
        res.status(401).json({ message: 'No Token' })
    }
}
