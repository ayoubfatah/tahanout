import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { changeStatus as changeStatusApi } from "../../services/apiOrders";
import { useParams } from "react-router-dom";

export function useChangeOrderStatus() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { mutate: changeStatus, isLoading } = useMutation({
    mutationFn: ({ id, status }: any) => changeStatusApi(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", id] });
    },
    onError: (err: any) => toast.error(err.message),
  });

  return { changeStatus, isLoading };
}
