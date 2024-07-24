import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";
import { useTranslation } from "react-i18next";

export function useUpdateSettings() {
  const { t } = useTranslation();
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: any) => updateSetting(data),
    onSuccess: () => {
      toast.success(t("Settings updated successfully"));
    },
    onError: (err: any) => toast.error(err.message),
  });

  return { mutate, isLoading };
}
