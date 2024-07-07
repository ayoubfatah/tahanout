import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { deleteProduct } from "../../services/apiProducts";
import { useScreenShake } from "../../hooks/useScreenShake";

export default function useDeleteCabin() {
  const queryClient = useQueryClient();
  const shakeScreen = useScreenShake();

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: (productId: number) => deleteProduct(productId),
    onSuccess: () => {
      toast.success("cabin has been successfully deleted  ");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },

    onError: () => {
      toast.error("This product cannot be deleted because it has orders");
      shakeScreen();
    },
  });
  return { isDeleting, mutate };
}
