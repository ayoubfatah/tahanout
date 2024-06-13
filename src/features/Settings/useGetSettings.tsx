import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export default function useGetSettings() {
  const { isLoading, data }: any = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isLoading, data };
}
