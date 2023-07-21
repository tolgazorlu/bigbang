import express, {Response, Request} from 'express'
const Product = require('../models/products');

exports.createProduct = async (req: Request, res: Response) => {
    try{
        const addProduct = async (name: String, detail: String, image: String, price: String) => {
            await Product.create({
                name: name,
                detail: detail,
                image: image,
                price: price,
            });
        }

        addProduct(req.body.name, req.body.detail, req.body.image, req.body.price);

        res.status(200).json(
            {
                'success': 'true'
            }
        );
    }
    catch(err){
        res.status(400).json({
            'succcess': 'fail'
        })
    }
    
}


exports.getProducts = async (req: Request, res: Response) => {
    try{
        const product = await Product.find({})
        res.status(200).json(product);
    }
    catch(err){
        res.status(400).json({
            'succcess': 'fail'
        })
    }
}