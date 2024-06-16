import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCustomer } from "../../services/apiCustomers";

export function useDeleteCustomer() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deletingCustomer } = useMutation({
    mutationFn: (customerId: number) => deleteCustomer(customerId),
    onSuccess: () => {
      toast.success("Customer has been successfully deleted  ");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (err: any) => toast.error(err.message),
  });

  return { isDeleting, deletingCustomer };
}
