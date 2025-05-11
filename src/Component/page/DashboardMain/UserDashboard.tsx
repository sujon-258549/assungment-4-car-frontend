import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Check, Edit, Heart, Settings, ShoppingCart, Star } from "lucide-react";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { useGetMyOrderQuery } from "@/redux/features/auth/Admin/product";
import { IOrder } from "@/types/order";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Link } from "react-router-dom";

export function UserDashboard() {
  const { data: user } = useGetMeQuery("");
  const { data: myorder } = useGetMyOrderQuery("");

  const totalOrders = myorder?.data?.data || [];
  const totalOrderLength = totalOrders.length;

  // Order status counts
  const paidOrders = totalOrders.filter(
    (order: IOrder) => order.paymentStatus === "Paid"
  ).length;

  const pendingOrders = totalOrders.filter(
    (order: IOrder) => order.paymentStatus === "Pending"
  ).length;

  const failedOrders = totalOrders.filter(
    (order: IOrder) => order.paymentStatus === "Failed"
  ).length;

  // Prepare data for charts
  const orderStatusData = [
    { name: "Paid", value: paidOrders, color: "#10B981" },
    { name: "Pending", value: pendingOrders, color: "#F59E0B" },
    { name: "Failed", value: failedOrders, color: "#EF4444" },
  ];

  // Monthly order data
  const monthlyOrderData = totalOrders.reduce(
    (acc: Record<string, number>, order: IOrder) => {
      const date = new Date(order.createdAt);
      const month = date.toLocaleString("default", { month: "short" });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    },
    {}
  );

  const monthlyData = Object.entries(monthlyOrderData).map(
    ([month, count]) => ({
      month,
      orders: count,
    })
  );

  // Stats data
  const stats = [
    {
      title: "Total Orders",
      value: totalOrderLength,
      icon: ShoppingCart,
      change: "+12% from last month",
    },
    {
      title: "Successful Orders",
      value: paidOrders,
      icon: Check,
      change: `${Math.round(
        (paidOrders / totalOrderLength) * 100
      )}% success rate`,
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: Star,
      change: `${Math.round(
        (pendingOrders / totalOrderLength) * 100
      )}% of total`,
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user?.profileImage} />
          <AvatarFallback>
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">
            {user?.firstName} {user?.lastName}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-muted-foreground">{user?.email}</p>
            <Badge variant="outline">{user?.role}</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Member since {new Date(user?.createdAt).toLocaleDateString()}
          </p>
        </div>
        <Link to={"/dashboard/update-profile"}>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order Visualization Charts */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        {/* Order Status Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Order Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Order Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#8884d8" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Orders</CardTitle>
          <Link to={"/dashboard/my-order"}>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {totalOrders.slice(0, 5).map((order: IOrder) => (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">
                    #{order._id.slice(-6).toUpperCase()}
                  </TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>${order.totalPrice?.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.paymentStatus === "Paid"
                          ? "default"
                          : order.paymentStatus === "Pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {order.paymentStatus}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
