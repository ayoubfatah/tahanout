import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duplicateProduct } from "../../services/apiProducts";
import { Product } from "../../Types/types";

export default function useAddProduct() {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation<Product, unknown, Product>({
    mutationFn: (product) => duplicateProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { isLoading, mutate };
}
