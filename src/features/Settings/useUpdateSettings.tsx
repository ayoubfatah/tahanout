import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export function useUpdateSettings() {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: any) => updateSetting(data),
    onSuccess: () => {
      toast.success("Settings updated successfully");
    },
    onError: (err: any) => toast.error(err.message),
  });

  return { mutate, isLoading };
}
