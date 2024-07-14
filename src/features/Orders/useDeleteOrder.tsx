import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteOrder } from "../../services/apiOrders";

export function useDeleteOrder() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deletingOrder } = useMutation({
    mutationFn: (orderId: number) => deleteOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order has been successfully deleted");
    },
    onError: (err: any) => toast.error(err.message),
  });

  return { isDeleting, deletingOrder };
}
