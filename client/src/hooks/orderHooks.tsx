import { useMutation } from "@tanstack/react-query"
import { CartItem, ShippingAddress } from "../types/Cart"
import apiClient from "../utils/apiClient"
import { Order } from '../types/Order'

export const useCreateOrderMutation = () =>
        useMutation({
          mutationFn: async (order: {
            orderItems: CartItem[]
            shippingAddress: ShippingAddress
            paymentMethod: string
            itemsPrice: number
            shippingPrice: number
            taxPrice: number
            totalPrice: number
          }) =>
            (
              await apiClient.post<{ message: string; order: Order }>(
                `api/orders`,
                order
              )
            ).data,
        })
