import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface GetProductsProps {
  page: number;
  rows: number;
  sortBy: "id" | "name" | "price";
  orderBy: "ASC" | "DESC";
}

interface ProductsResponse {
  products: Product[];
  count: number;
}

export const PRODUCTS_KEY = "products";

async function getProducts({
  page = 1,
  rows = 5,
  sortBy = "id",
  orderBy = "ASC",
}: GetProductsProps): Promise<Product[]> {
  const params = new URLSearchParams({
    page: String(page),
    rows: String(rows),
    sortBy,
    orderBy,
  }).toString();

  const { data }: AxiosResponse<ProductsResponse> = await api.get(`products?${params}`);


  return data.products;
}

export function useProducts(props: GetProductsProps) {
  return useQuery({
    queryKey: [PRODUCTS_KEY],
    queryFn: () => getProducts(props),
    initialData: [],
  });
}
