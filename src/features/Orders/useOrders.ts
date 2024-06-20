import { useMutation, useQuery } from "@tanstack/react-query";
import { getOrders } from "../../services/apiOrders";

export function useOrders() {
  const { data:orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
  });

  return { orders, isLoading };
}
