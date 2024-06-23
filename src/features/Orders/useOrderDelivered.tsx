import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { delivered } from "../../services/apiOrders";

export function useDelivered() {
  const queryClient = useQueryClient();
  const { mutate: setToDelivered, isLoading } = useMutation({
    mutationFn: (id: number) => delivered(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order delivered successfully");
    },
    onError: (err: any) => toast.error(err.message),
  });

  return { setToDelivered, isLoading };
}
