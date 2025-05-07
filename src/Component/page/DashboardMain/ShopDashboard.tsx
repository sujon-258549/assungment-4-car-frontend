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
import { Box, Plus } from "lucide-react";

export function ShopDashboard() {
  // Sample data
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      icon: "dollar",
    },
    {
      title: "Orders",
      value: "+2350",
      change: "+180.1%",
      icon: "shoppingCart",
    },
    { title: "Products", value: "+12,234", change: "+19%", icon: "boxes" },
    { title: "Customers", value: "+573", change: "+201", icon: "users" },
  ];

  const orders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      amount: "$250.00",
      status: "Completed",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      amount: "$150.00",
      status: "Processing",
    },
    {
      id: "ORD-003",
      customer: "Robert Johnson",
      amount: "$350.00",
      status: "Shipped",
    },
  ];

  const inventory = [
    { name: "T-Shirts", value: 78, total: 100 },
    { name: "Jeans", value: 45, total: 100 },
    { name: "Sneakers", value: 23, total: 50 },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className="h-4 w-4 text-muted-foreground">
                {/* {Icons[stat.icon as keyof typeof Icons]({
                  className: "h-4 w-4",
                })} */}
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

      {/* Combined Table and Inventory */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Orders Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Processing"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Inventory Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {inventory.map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span>
                    {item.value}/{item.total}
                  </span>
                </div>
                <Progress value={(item.value / item.total) * 100} />
              </div>
            ))}
            <Button className="w-full mt-4" variant="outline">
              Manage Inventory
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Button className="flex-1" variant="secondary">
          <Plus className="mr-2 h-4 w-4" />
          New Order
        </Button>
        <Button className="flex-1" variant="secondary">
          <Box className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
    </div>
  );
}
