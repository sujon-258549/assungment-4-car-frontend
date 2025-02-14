import { useCurrentUser } from "@/redux/features/assignment4/authSlice";
import { useAppSelector } from "@/redux/hooks";
import GetAllUser from "../Admin/GetAllUser";
import StudentDashboard from "./StudentDashboard";

const Dashboard = () => {
  const user = useAppSelector(useCurrentUser);
  const role = user?.role;
  return <div>{role === "admin" ? <GetAllUser /> : <StudentDashboard />}</div>;
};

export default Dashboard;
