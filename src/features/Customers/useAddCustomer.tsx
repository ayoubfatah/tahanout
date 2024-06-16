import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CustomersType } from "../../Types/types";
import { createCustomer } from "../../services/apiCustomers";

export default function useAddCustomer() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: addCustomerFun } = useMutation<
    CustomersType,
    unknown,
    CustomersType
  >({
    mutationFn: (customer: any) => createCustomer(customer),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  return { isLoading, addCustomerFun };
}
