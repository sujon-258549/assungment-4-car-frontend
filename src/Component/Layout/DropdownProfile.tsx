import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { logOut } from "@/redux/features/assignment4/authSlice";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import Loder from "../Utils/Loder";
const DropdownProfile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handelLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  const { data: meData, isLoading } = useGetMeQuery("me");
  if (isLoading) {
    return <Loder />;
  }
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage
              src={meData.profileImage || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-[16px] w-[200px]">
          <DropdownMenuLabel> My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to={"/dashboard"}> Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            {" "}
            <Link to={"/dashboard/profile"}> Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              className="bg-red-600 w-full text-white"
              onClick={handelLogout}
            >
              Log Out <LogOut className="text-xl" />
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownProfile;
