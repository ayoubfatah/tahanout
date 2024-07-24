import toast from "react-hot-toast";
import { Product } from "../../Types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProduct } from "../../services/apiProducts";
import { useParams } from "react-router-dom";
import { t } from "i18next";

// Mutation function
export default function useEditProduct() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { mutate, isLoading: isEditing } = useMutation({
    mutationFn: ({ newProductData, id }: any) =>
      editProduct(newProductData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      toast.success(t("Product updated successfully"));
    },
    onError: (err: any) => toast.error(err.message),
  });

  return { isEditing, mutate };
}
