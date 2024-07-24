import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCustomer } from "../../services/apiCustomers";
import { useScreenShake } from "../../hooks/useScreenShake";
import { t } from "i18next";

export function useDeleteCustomer() {
  const queryClient = useQueryClient();
  const shakeScreen = useScreenShake();

  const { isLoading: isDeleting, mutate: deletingCustomer } = useMutation({
    mutationFn: (customerId: number) => deleteCustomer(customerId),
    onSuccess: () => {
      toast.success(t("Customer has been successfully deleted"));
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (err: any) => {
      toast.error(t("This customer cannot be deleted because it has orders"));
      shakeScreen();
    },
  });

  return { isDeleting, deletingCustomer };
}
