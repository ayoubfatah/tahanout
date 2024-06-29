import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addImages } from "../../services/apiProducts";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useAddProductImages() {
  const { id } = useParams();

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ images, id }: any) => addImages(images, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      toast.success("Images added successfully");
    },
    onError: () => {
      toast.error("Failed to add images");
    },
  });

  return { mutate, isLoading };
}
