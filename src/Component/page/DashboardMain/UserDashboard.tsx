import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Check, Edit, Heart, Settings, ShoppingCart } from "lucide-react";

export function UserDashboard() {
  // Sample user data
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "Premium Member",
    joinDate: "January 2023",
    avatar: "/avatars/01.png",
  };

  // Stats data
  const stats = [
    {
      title: "Total Orders",
      value: "47",
      change: "+12%",
      icon: "shoppingCart",
    },
    { title: "Wishlist Items", value: "18", change: "+5", icon: "heart" },
    { title: "Reviews", value: "23", change: "+8", icon: "star" },
    { title: "Loyalty Points", value: "1,250", change: "+150", icon: "award" },
  ];

  // Recent activity
  const activity = [
    {
      id: "ACT-001",
      action: "Order placed",
      item: "Wireless Headphones",
      date: "10 min ago",
      status: "completed",
    },
    {
      id: "ACT-002",
      action: "Review submitted",
      item: "Smart Watch",
      date: "2 hours ago",
      status: "completed",
    },
    {
      id: "ACT-003",
      action: "Return requested",
      item: "Running Shoes",
      date: "1 day ago",
      status: "pending",
    },
    {
      id: "ACT-004",
      action: "Payment method updated",
      item: "VISA •••• 4242",
      date: "2 days ago",
      status: "completed",
    },
  ];

  // Account completion
  const completionItems = [
    { label: "Profile Information", completed: true },
    { label: "Shipping Address", completed: true },
    { label: "Payment Method", completed: true },
    { label: "Two-Factor Auth", completed: false },
    { label: "Preferences", completed: false },
  ];

  const completionPercentage = Math.round(
    (completionItems.filter((item) => item.completed).length /
      completionItems.length) *
      100
  );

  return (
    <div className="space-y-6 p-6">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-muted-foreground">{user.email}</p>
            <Badge variant="outline">{user.role}</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Member since {user.joinDate}
          </p>
        </div>
        <Button variant="outline">
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className="h-4 w-4 text-muted-foreground">
                {/* {[stat as keyof typeof Icons]({ className: "h-4 w-4" })} */}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activity.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.action}</TableCell>
                    <TableCell>{item.item}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.status === "completed" ? "default" : "secondary"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Account Completion */}
        <Card>
          <CardHeader>
            <CardTitle>Account Setup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Profile Completion</span>
                <span className="text-sm font-medium">
                  {completionPercentage}%
                </span>
              </div>
              <Progress value={completionPercentage} />
            </div>

            <div className="space-y-3">
              {completionItems.map((item) => (
                <div key={item.label} className="flex items-center">
                  {item.completed ? (
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <circle className="h-4 w-4 text-muted-foreground mr-2" />
                  )}
                  <span
                    className={item.completed ? "" : "text-muted-foreground"}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <Button className="w-full" variant="outline">
              Complete Setup
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Button variant="outline" className="h-24 flex-col gap-2">
          <ShoppingCart className="h-6 w-6" />
          <span>Order History</span>
        </Button>
        <Button variant="outline" className="h-24 flex-col gap-2">
          <Heart className="h-6 w-6" />
          <span>Wishlist</span>
        </Button>
        <Button variant="outline" className="h-24 flex-col gap-2">
          <Settings className="h-6 w-6" />
          <span>Account Settings</span>
        </Button>
      </div>
    </div>
  );
}
