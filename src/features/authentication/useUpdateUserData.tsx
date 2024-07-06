import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUserData() {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: any) => updateCurrentUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  return { mutate, isLoading };
}
