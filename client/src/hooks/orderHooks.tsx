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
      (
        await apiClient.post<{ message: string; order: Order }>(
          `order/createOrder`,
          order
        )
      ).data,
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
    queryKey: ["order/history"],
    queryFn: async () => (await apiClient.get<Order[]>("order/history")).data,
  });

export const useGetOrderSummaryQuery = () =>
  useQuery({
    queryKey: ["orders-summary"],
    queryFn: async () =>
      (
        await apiClient.get<{
          orders: [{ numOrders: number; totalSales: number }];
        }>("order/summary")
      ).data,
  });

export const useGetOrdersQuery = () =>
  useQuery({
    queryKey: ["orders"],
    queryFn: async () => (await apiClient.get<Order[]>(`order/all`)).data,
  });

  export const useDeliverOrderMutation = () =>
  useMutation({
    mutationFn: async ( orderId: string ) =>
      (
        await apiClient.put<{ message: string; order: Order }>(
          `order/${orderId}/deliver`
        )
      ).data,
  });