import { useCurrentUser } from "@/redux/features/assignment4/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { ShopDashboard } from "./ShopDashboard";
import { UserDashboard } from "./UserDashboard";

const Dashboard = () => {
  const user = useAppSelector(useCurrentUser);
  const role = user?.role;
  return <div>{role === "admin" ? <ShopDashboard /> : <UserDashboard />}</div>;
};

export default Dashboard;
