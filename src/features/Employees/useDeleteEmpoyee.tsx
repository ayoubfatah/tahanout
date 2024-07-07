import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteEmployee } from "../../services/apiEmployees";

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: (id: any) => deleteEmployee(id),
    onSuccess: () => {
      toast.success("Employee has been successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });
  return { isDeleting, mutate };
}
