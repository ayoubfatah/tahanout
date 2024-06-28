import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateImages } from "../../services/apiProducts";
import { useParams } from "react-router-dom";

export function useUpdateImages() {
  const queryClient = useQueryClient();
  const { id } = useParams();

  console.log("Product ID from params:", id); // Add this line to debug

  const { mutate: orderingImages, isLoading } = useMutation({
    mutationFn: ({ imageUrls, productId }: any) =>
      updateImages(imageUrls, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      toast.success("Images updated successfully");
    },
    onError: (err: any) => {
      console.error("Mutation error:", err); // Add this line to debug
      toast.error(err.message);
    },
  });

  return { orderingImages, isLoading };
}
