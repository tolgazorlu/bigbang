import { Request, Response } from "express";
import { Product } from "../models/products";
import { Order, OrderModel } from "../models/order";

module.exports.Order = async (req: Request, res: Response) => {
    if (req.body.orderItems.length === 0) {
        res.status(400).send({ message: 'Cart is empty' })
    } else {
        const createdOrder = await OrderModel.create({
            orderItems: req.body.orderItems.map((x: Product) => ({
                ...x,
                product: x._id,
            })),
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id
        } as Order)
        res
            .status(201)
            .send({ message: 'Order Not Found', order: createdOrder })
    }
}