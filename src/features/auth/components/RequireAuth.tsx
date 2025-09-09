import { useAppSelector } from "@/app/hooks";
import { Navigate, Outlet } from "react-router-dom";

interface RequireAuthProps {
  allowedRoles?: string[];
}
const RequireAuth = ({ allowedRoles = [] }: RequireAuthProps) => {
  const { accessToken, loading, roles } = useAppSelector((state) => state.auth);

  if (loading) return <div>Loading...</div>;

  if (!accessToken) return <Navigate to="/login" replace />;

  if (
    !allowedRoles.length ||
    roles?.some((role) => allowedRoles.includes(role))
  ) {
    return <Outlet />;
  }

  return <Navigate to="/unauthorized" replace />;
};

export default RequireAuth;
