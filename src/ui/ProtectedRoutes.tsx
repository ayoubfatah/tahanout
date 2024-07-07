// ProtectedRoutes.tsx
import React, { ReactNode, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";

type ProtectedRoutesProps = {
  children: ReactNode;
};

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user, isLoading, isAuthenticated } = useUser();
  
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isAuthenticated) return <>{children}</>;
};

export default ProtectedRoutes;
