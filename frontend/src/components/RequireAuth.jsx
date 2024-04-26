import { useLocation, Navigate, Outlet } from "react-router-dom";
import useStore from "../store/store";

function RequireAuth() {
  const user = useStore((state) => state.user);
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      state={{ from: location }}
      replace
    />
  );
}
export default RequireAuth;
