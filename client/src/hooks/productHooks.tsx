import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { Product } from "../types/ProductType";

export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ["product"],
    queryFn: async () => (await apiClient.get<Product[]>(`product`)).data,
  });

export const useGetProductDetailsBySlugQuery = (slug: string) =>
  useQuery({
    queryKey: ["product", slug],
    queryFn: async () => (await apiClient.get<Product>(`product/${slug}`)).data,
  });

export const useGetCategoriesQuery = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await apiClient.get<[]>(`product/categories`)).data,
  });

export const useSearchProductsQuery = ({
  query,
  category,
}: {
  query: string;
  category: string;
}) => useQuery({
  queryKey: ['product', query, category],
  queryFn: async () => (await apiClient.get<Product[]>(`product/search?query=${query}&category=${category}`)).data,
});

export const useCreateProductMutation = () => useMutation({
  mutationFn: async (product: {
    name: string;
    slug: string;
    category: string;
    detail: string;
    image: string;
    rating: number;
    price: number;
    age: number;
    
  }) =>
    (
      await apiClient.post<{ product: Product }>(
        `product/createProduct`,
        product
      )
    ).data,
})