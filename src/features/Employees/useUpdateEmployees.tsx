import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateEmployee } from "../../services/apiEmployees";

export function useUpdateEmployees() {
  const queryClient = useQueryClient();
  const { mutate, isLoading: isEditing } = useMutation({
    mutationFn: ({ newEmployeeData, email }: any) =>
      updateEmployee(newEmployeeData, email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (err: any) => toast.error(err.message),
  });

  return { isEditing, mutate };
}
