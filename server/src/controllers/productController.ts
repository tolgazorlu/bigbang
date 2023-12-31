import { Response, Request, NextFunction } from 'express'
import { Product, ProductModel } from '../models/products'

exports.createProduct = async (req: Request, res: Response) => {
    try {
        const addProduct = async (name: String, slug: String, category: Number, detail: String, image: String, rating: Number, age: Number, price: Number) => {
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
    catch (err) {
        res.status(400).json({
            'succcess': 'fail'
        })
    }
}

exports.getProducts = async (req: Request, res: Response) => {
    try {
        const product = await ProductModel.find({})
        res.status(200).json(product);
    }
    catch (err) {
        res.status(400).json({
            'succcess': 'fail'
        })
    }
}

exports.getProduct = async (req: Request, res: Response) => {
    try {
        const product = await ProductModel.findOne({ slug: req.params.slug })
        if (product) {
            res.status(200).json(product)
        }
    } catch (error) {
        res.status(400).json({
            'success': 'fail'
        })
    }
}

exports.getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await ProductModel.find().distinct('category')
        res.send(categories)
    } catch (error) {
        res.status(404).json({ "message": error })
    }
}

exports.getSearchProducts = async (req: Request, res: Response) => {
    const searchQuery = req.query.query || ''
    const category = (req.query.category || '') as string

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            name: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {}

        const categoryFilter = category && category !== 'all' ? { category } : {}

    const products = await ProductModel.find({ ...queryFilter, ...categoryFilter })

    res.send(products)
}

exports.deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await ProductModel.findById(req.params.id)
        if(product){
            const deletedProduct = await product.deleteOne()
            res.status(200).send({message: 'success', product: deletedProduct})
        }
        res.status(404).send({message: 'Product not found!'})
    } catch (error) {
        res.status(404).send({message: error})
    }
}

module.exports.updateProduct = async (req: Request, res: Response) => {
    try {
        const product = await ProductModel.findById(req.params.id)
        if (product) {
            product.name = req.body.name || product.name
            product.slug = req.body.slug || product.slug
            product.category = req.body.category || product.category
            product.detail = req.body.detail || product.detail
            product.image = req.body.image || product.image
            product.rating = req.body.rating || product.rating
            product.price = req.body.price || product.price
            product.age = req.body.age || product.age
            const updatedProduct = await product.save()
            res.send({updatedProduct})
        }
    } catch (error) {
        res.json({ "message": error })
    }
}