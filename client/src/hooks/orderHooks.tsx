import { useMutation, useQuery } from "@tanstack/react-query";
import { CartItem, ShippingAddress } from "../types/Cart";
import { Order } from "../types/Order";
import apiClient from "../utils/apiClient";

export const useCreateOrderMutation = () =>
  useMutation({
    mutationFn: async (order: {
      orderItems: CartItem[];
      shippingAddress: ShippingAddress;
      paymentMethod: string;
      itemsPrice: number;
      shippingPrice: number;
      taxPrice: number;
      totalPrice: number;
    }) =>
      (await apiClient.post<{ message: string; order: Order }>(`order/createOrder`, order))
        .data,
  });

export const useGetOrderDetailsQuery = (id: string) =>
  useQuery({
    queryKey: ["orders", id],
    queryFn: async () => (await apiClient.get<Order>(`order/${id}`)).data,
  });

export const usePayOrderMutation = () =>
  useMutation({
    mutationFn: async (details: { orderId: string }) =>
      (
        await apiClient.put<{ message: string; order: Order }>(
          `order/${details.orderId}/pay`,
          details
        )
      ).data,
  });

  export const useGetOrderHistoryQuery = () =>
  useQuery({
   queryKey: ['orderHistory'],
   queryFn: async () =>
     (
       await apiClient.get<Order[]>(`order`)
     ).data,
  })
