import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";

export default function useProducts() {
  const { isLoading, data }: any = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const { data: products } = data ?? {};
  return { isLoading, products };
}
