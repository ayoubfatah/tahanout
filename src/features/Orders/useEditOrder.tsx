import toast from "react-hot-toast";
import { Product } from "../../Types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProduct } from "../../services/apiProducts";
import { editOrder } from "../../services/apiOrders";

// Mutation function
export default function useEditOrder() {
  const queryClient = useQueryClient();
  const { mutate, isLoading: isEditing } = useMutation({
    mutationFn: ({ newProductData, id }: any) => editOrder(newProductData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order updated successfully");
    },
    onError: (err: any) => toast.error(err.message),
  });

  return { isEditing, mutate };
}
