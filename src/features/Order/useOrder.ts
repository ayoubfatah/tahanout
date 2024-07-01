import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../services/apiProducts";
import { useParams, useSearchParams } from "react-router-dom";
import { getOrder } from "../../services/apiOrders";

export default function useOrder() {
  // Prefetching
  const { id } = useParams();

  const {
    isLoading,
    data: order,
    error,
  } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder(Number(id)),
    retry: false,
  });

  return { isLoading, order, error };
}
