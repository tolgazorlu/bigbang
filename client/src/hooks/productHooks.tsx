import { useQuery } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { Product } from "../types/ProductType";

export const useGetProductsQuery = () =>
   useQuery({
    queryKey: ['product'],
    queryFn: async () =>
      (
        await apiClient.get<Product>(`product`)
      ).data,
   })

   export const useGetProductDetailsBySlugQuery = (slug: string) =>
   useQuery({
     queryKey: ['product', slug],
     queryFn: async () =>
       (await apiClient.get<Product>(`product/${slug}`)).data,
   })