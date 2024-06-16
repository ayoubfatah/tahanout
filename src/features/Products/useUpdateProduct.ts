import toast from "react-hot-toast";
import { Product } from "../../Types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProduct } from "../../services/apiProducts";

// Mutation function
export default function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate, isLoading: isEditing } = useMutation({
    mutationFn: ({ newProductData, id }: any) =>
      editProduct(newProductData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product updated successfully");
    },
    onError: (err: any) => toast.error(err.message),
  });

  return { isEditing, mutate };
}
