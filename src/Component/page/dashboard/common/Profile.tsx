import { useGetMeQuery } from "@/redux/features/auth/authApi";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { User2 } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { data: meData, isLoading } = useGetMeQuery("me");

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <Skeleton className="h-64 w-full rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-20 w-full rounded-lg" />
      </div>
    );
  }

  if (!meData) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <h2 className="text-xl font-semibold">No user data found</h2>
        </CardHeader>
      </Card>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card
      style={{ boxShadow: "10px 10px 10px" }}
      className="max-w-5xl mx-auto overflow-hidden shadow-2xl md:m-10 m-5"
    >
      <CardHeader className="rounded-t-md bg-gradient-to-br from-cyan-950 to-cyan-600 text-white p-8 text-center relative">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 border-4 border-white mb-4">
            <AvatarImage
              src={meData?.profileImage}
              alt={`${meData.firstName} ${meData.lastName}`}
            />
            <AvatarFallback>
              {meData.firstName.charAt(0)}
              {meData.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold">
            {meData.firstName} {meData.lastName}
          </h1>
          <Badge
            variant="secondary"
            className="mt-2 bg-white/20 hover:bg-white/30"
          >
            {meData.role === "user" ? "Standard User" : meData.role}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="divide-y">
        <div className="py-6 space-y-2">
          <h2 className="text-lg font-medium text-gray-700">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{meData.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{meData.phoneNumber}</p>
            </div>
            {meData.birthDate && (
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">{formatDate(meData.birthDate)}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p
                className={`font-medium ${
                  meData.isActive ? "text-green-600" : "text-red-600"
                }`}
              >
                {meData.isActive ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
        </div>

        <div className="py-6 space-y-2">
          <h2 className="text-lg font-medium text-gray-700">
            Address Information
          </h2>
          <address className="not-italic space-y-1">
            {meData.address?.street && (
              <p className="font-medium">{meData.address.street}</p>
            )}
            {meData.address?.street2 && <p>{meData.address.street2}</p>}
            <div className="flex flex-wrap gap-x-4">
              {meData.address?.village && <p>{meData.address.village}</p>}
              {meData.address?.subdistrict && (
                <p>{meData.address.subdistrict}</p>
              )}
              {meData.address?.district && <p>{meData.address.district}</p>}
              {meData.address?.state && <p>{meData.address.state}</p>}
            </div>
            <div className="flex gap-x-4">
              {meData.address?.country && <p>{meData.address.country}</p>}
              {meData.address?.postalCode && <p>{meData.address.postalCode}</p>}
            </div>
          </address>
        </div>
      </CardContent>
      <Link to={"/dashboard/update-profile"}>
        <Button className="bg-[#424242] ml-7 hover:bg-[#424242da]">
          Update Profile <User2 />
        </Button>
      </Link>
      <CardFooter className="bg-gray-50 p-4 text-sm text-gray-500 justify-end space-x-4">
        <p>Member since: {formatDate(meData.createdAt)}</p>
        {meData.updatedAt && (
          <p>Last updated: {formatDate(meData.updatedAt)}</p>
        )}
      </CardFooter>
    </Card>
  );
};

export default Profile;
