import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.setQueryData(["authUser"], null);
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return { logout, isLoading };
};
