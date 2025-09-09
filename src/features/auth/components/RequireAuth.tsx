import { useAppSelector } from "@/app/hooks";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const { accessToken, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (accessToken) {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} replace />;
  }
};

export default RequireAuth;
