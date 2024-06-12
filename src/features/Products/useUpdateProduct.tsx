import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editProduct } from "../../services/apiProducts";
import { Product } from "../../Types/types";

export default function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate, isLoading: isEditing } = useMutation({
    mutationFn: ({
      newProductData,
      id,
    }: {
      newProductData: Product;
      id: number;
    }) => editProduct(newProductData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err: any) => toast.error(err.message),
  });
  return { isEditing, mutate };
}
