import express, { Express, Response, Request} from 'express'

exports.getIndex = async (req: Request, res: Response) => {
    res.status(200).json(
        {
            'success': 'true'
        }
    )
}