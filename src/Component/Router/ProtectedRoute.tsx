import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { varyFyToken } from "../Utils/decodeJwt";
import { useCurrentToken } from "@/redux/features/assignment4/authSlice";

type TChildrenAndRole = {
  children: ReactNode;
  role: string | undefined;
};
const ProtectedRoute = ({ children, role }: TChildrenAndRole) => {
  const token = useAppSelector(useCurrentToken);
  console.log(token);
  let user;
  if (token) {
    user = varyFyToken(token);
  }
  //   @ts-expect-error-for token
  const UserRole = user?.role;
  console.log({ UserRole, role });
  if (role !== undefined && role !== UserRole) {
    return <Navigate to={"/login"} replace={true} />;
    // dispatch(logOut());
  }
  if (!token) {
    return <Navigate to={"/login"} replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
