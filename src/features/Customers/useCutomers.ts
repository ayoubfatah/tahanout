import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../../services/apiCustomers";

export function useCustomers() {
  const { isLoading, data: customers } = useQuery({
    queryFn: () => getCustomers(),
    queryKey: ["customers"],
  });

  return { isLoading, customers };
}
