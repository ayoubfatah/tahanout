import { useQuery, useQueryClient } from "@tanstack/react-query";
import getProducts from "../../services/apiProducts";

export default function useCabins() {
  const {
    isLoading,
    data: Products,
    error,
  } = useQuery({
    queryKey: ["products"], // this will uniquely identify the data that we will query
    queryFn: () => getProducts(),
  });

  return { isLoading, Products, error };
}
