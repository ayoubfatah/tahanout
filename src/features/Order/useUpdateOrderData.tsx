import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderDate } from "../../services/apiOrders";
import { useParams } from "react-router-dom";

export const useUpdateOrderDate = () => {
  const queryClient = useQueryClient();
  const { id } = useParams() || {};

  const { mutate } = useMutation(
    ({ id, status }: { id: any; status: string }) =>
      updateOrderDate(id, status),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        queryClient.invalidateQueries({ queryKey: ["order", id] });
      },
      onError: (error: any) => {
        console.error("Error updating order date:", error);
      },
    }
  );

  return { mutate };
};
