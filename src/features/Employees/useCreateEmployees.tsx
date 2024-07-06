import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { EmployeesType } from "../../Types/types";
import { createEmployee } from "../../services/apiEmployees";

export function useCreateEmployees() {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: (employee: any) => createEmployee(employee),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee created successfully");
    },
    onError: (err: any) => toast.error(err.message),
  });
  return { isLoading, mutate };
}
