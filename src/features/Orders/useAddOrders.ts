import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createOrder } from "../../services/apiOrders";

export default function useAddProduct() {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation<any, unknown, any>({
    mutationFn: (order) => createOrder(order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  return { isLoading, mutate };
}
