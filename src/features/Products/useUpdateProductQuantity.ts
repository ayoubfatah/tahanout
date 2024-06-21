import toast from "react-hot-toast";
import { Product } from "../../Types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProduct, updateQuantity } from "../../services/apiProducts";

// Mutation function
export default function useUpdateProductQuantity() {
  const queryClient = useQueryClient();
  const { mutate: upQuantity, isLoading: isEditing } = useMutation({
    mutationFn: ({ newQuantity, id }: any): any =>
      updateQuantity(newQuantity, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err: any) => toast.error(err.message),
  });

  return { isEditing, upQuantity };
}
