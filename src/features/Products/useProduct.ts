import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../services/apiProducts";
import { useParams, useSearchParams } from "react-router-dom";

export default function useProduct() {
  // Prefetching
  const { id } = useParams();
  const productId = id;

  const {
    isLoading,
    data: product,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: (productId: any) => getProduct(productId),
    retry: false,
  });

  return { isLoading, product, error };
}
