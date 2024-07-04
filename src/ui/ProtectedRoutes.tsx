// ProtectedRoutes.tsx
import React, { ReactNode, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../features/login/useUser";
import Spinner from "./Spinner";

type ProtectedRoutesProps = {
  children: ReactNode;
};

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user, isLoading, isAuthenticated } = useUser();
  console.log(isAuthenticated, user);
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/logi);
    }
  }, [isAuthenticated]);
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  if (isAuthenticated) return <>{children}</>;
};

export default ProtectedRoutes;
