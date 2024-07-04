import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loginType } from "../../Types/types";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: loginType) =>
      login({
        email: data.email,
        password: data.password,
      }),
    onSuccess: (result: any) => {
      if (result.success) {
        queryClient.setQueriesData(["user"], result?.data.user);
        navigate("/dashboard ", { replace: true });
        console.log(result);
      } else {
        toast.error("Invalid email or password");
      }
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  return { mutate, isLoading };
}
