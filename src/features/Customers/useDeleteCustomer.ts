import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCustomer } from "../../services/apiCustomers";
import { useScreenShake } from "../../hooks/useScreenShake";

export function useDeleteCustomer() {
  const queryClient = useQueryClient();
  const shakeScreen = useScreenShake();

  const { isLoading: isDeleting, mutate: deletingCustomer } = useMutation({
    mutationFn: (customerId: number) => deleteCustomer(customerId),
    onSuccess: () => {
      toast.success("Customer has been successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (err: any) => {
      toast.error("This customer cannot be deleted because it has orders");
      shakeScreen();
    },
  });

  return { isDeleting, deletingCustomer };
}
