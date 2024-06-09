import { useQuery, useQueryClient } from "@tanstack/react-query";
import getProducts from "../../services/apiProducts";

export default function useCabins() {
  const { isLoading, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return { isLoading, products };
}
