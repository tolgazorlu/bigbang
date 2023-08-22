import express, {Response, Request} from 'express'
import { ProductModel } from '../models/products'

exports.createProduct = async (req: Request, res: Response) => {
    try{
        const addProduct = async (name: String, slug:String, category:Number, detail: String, image: String, rating: Number, age: Number, price: Number) => {
            await ProductModel.create({
                name: name,
                slug: slug,
                category: category,
                detail: detail,
                image: image,
                rating: rating,
                age: age,
                price: price,
            });
        }

        addProduct(req.body.name, req.body.slug, req.body.category, req.body.detail, req.body.image, req.body.rating, req.body.age, req.body.price);

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
        const product = await ProductModel.find({})
        res.status(200).json(product);
    }
    catch(err){
        res.status(400).json({
            'succcess': 'fail'
        })
    }
}