import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateEmployeeRole } from "../../services/apiEmployees";

export function useUpdateEmployeeRole() {
  const queryClient = useQueryClient();
  const { mutate, isLoading: isEditing } = useMutation({
    mutationFn: ({
      newEmployeeRole,
      email,
    }: {
      newEmployeeRole: string;
      email: string;
    }) => updateEmployeeRole({ email, role: newEmployeeRole }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee role updated successfully");
    },
    onError: (err: any) => toast.error(err.message),
  });

  return { isEditing, mutate };
}
