import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";

export function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: (data: any) => signUpApi(data),
  });

  return { signUp, isLoading };
}
