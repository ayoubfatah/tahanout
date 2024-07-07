import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createEmployee } from "../../services/apiEmployees";

export function useCreateEmployees() {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: (employee: any) => createEmployee(employee),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (err: any) => toast.error(err.message),
  });
  return { isLoading, mutate };
}
