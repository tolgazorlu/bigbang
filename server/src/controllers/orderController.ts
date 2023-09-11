import { Request, Response } from "express";
import { Product } from "../models/products";
import { Order, OrderModel } from "../models/order";

module.exports.createOrder = async (req: Request, res: Response) => {
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
            .send({ message: 'Order Found', order: createdOrder })
    }
}

module.exports.getOrder = async (req: Request, res: Response) => {
    const order = await OrderModel.findById(req.params.id)
    if (order) {
        res.send(order)
    } else {
        res.status(404).send({ message: 'Order Not Found' })
    }
}

module.exports.payOrder = async (req: Request, res: Response) => {
    
    const order = await OrderModel.findById(req.params.id).populate('user')

    if (order) {
        order.isPaid = true
        order.paidAt = new Date(Date.now())
        order.paymentResult = {
            paymentId: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        }
        const updatedOrder = await order.save()

        res.send(updatedOrder)
    } else {
        res.status(404).send({ message: 'Order Not Found' })
    }
}