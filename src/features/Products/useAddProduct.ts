import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createProduct } from "../../services/apiProducts";
import { Product } from "../../Types/types";

export default function useAddProduct() {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation<Product, unknown, Product>({
    mutationFn: (product) => createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { isLoading, mutate };
}
