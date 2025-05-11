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
import {
  AlignLeft,
  Box,
  DollarSign,
  Loader,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useGetAllUserQuery } from "@/redux/features/auth/authApi";
import {
  useGetAllCarQuery,
  useGetAllOrderQuery,
} from "@/redux/features/auth/Admin/product";
import { IOrder } from "@/types/order";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TCar } from "@/types/car";
import { Badge } from "@/components/ui/badge";

export function ShopDashboard() {
  const { data: users } = useGetAllUserQuery("");
  const { data: products, isLoading } = useGetAllCarQuery("");
  const { data: allOrder } = useGetAllOrderQuery("");

  if (isLoading) {
    return <Loader />;
  }

  const usersLength = users?.data?.data?.length || 0;
  const productsLength = products?.data?.data?.length || 0;
  const allOrderLength = allOrder?.data?.data?.length || 0;
  const orders = allOrder?.data?.data || [];
  const productData = products?.data?.data || [];

  // Calculate order statistics
  const paidOrders = orders.filter(
    (order: IOrder) => order.paymentStatus === "Paid"
  );
  const pendingOrders = orders.filter(
    (order: IOrder) => order.paymentStatus === "Pending"
  );
  const paidTotalAmount = paidOrders.reduce(
    (total: number, order: IOrder) => total + (order.totalPrice || 0),
    0
  );

  // Calculate inventory statistics
  const inStock = productData.filter(
    (product: TCar) => product.inStock === true
  );
  const outStock = productData.filter(
    (product: TCar) => product.inStock !== true
  );
  const inStockPercentage = (inStock.length / productData.length) * 100;
  const outStockPercentage = (outStock.length / productData.length) * 100;

  // Stats data
  const stats = [
    {
      title: "Total Amount",
      value: `$${paidTotalAmount.toFixed(2)}`,
      icon: DollarSign,
      description: "Total revenue from paid orders",
    },
    {
      title: "Orders",
      value: allOrderLength,
      icon: ShoppingCart,
      description: `${paidOrders.length} paid • ${pendingOrders.length} pending`,
    },
    {
      title: "Products",
      value: productsLength,
      icon: Box,
      description: `${inStock.length} in stock • ${outStock.length} out of stock`,
    },
    {
      title: "Customers",
      value: usersLength,
      icon: Users,
      description: "Total registered customers",
    },
  ];

  // Sales data for line chart (last 6 months)
  const salesData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 2780 },
    { name: "May", sales: 1890 },
    { name: "Jun", sales: 2390 },
  ];

  // Product distribution data for pie chart (top 5 products)
  const productDistribution = productData.slice(0, 5).map((product: TCar) => ({
    name: `${product.brand} ${product.model}`,
    value: product.quantity || 0,
  }));

  // Order status data for bar chart
  const orderStatusData = [
    { name: "Paid", count: paidOrders.length },
    { name: "Pending", count: pendingOrders.length },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

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
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        {/* Sales Trend Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Sales"]} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Product Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={productDistribution}
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
                  {productDistribution.map(
                    (entry: { name: string; value: number }, index: number) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    )
                  )}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} units`, "Quantity"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders and Inventory */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Orders Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Link to="/dashboard/my-order">
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
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.slice(0, 5).map((order: IOrder) => (
                  <TableRow key={order._id}>
                    <TableCell className="font-medium">
                      {order?.transaction?.id?.slice(0, 8) || "N/A"}
                    </TableCell>
                    <TableCell>
                      {order.customerId?.firstName || "Guest"}
                    </TableCell>
                    <TableCell>
                      ${order.totalPrice?.toFixed(2) || "0.00"}
                    </TableCell>
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

        {/* Inventory Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">In Stock</span>
                <span>
                  {inStock.length} ({inStockPercentage.toFixed(0)}%)
                </span>
              </div>
              <Progress value={inStockPercentage} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Out of Stock</span>
                <span>
                  {outStock.length} ({outStockPercentage.toFixed(0)}%)
                </span>
              </div>
              <Progress value={outStockPercentage} />
            </div>
            <Button
              className="w-full mt-4 bg-[#424242] text-white hover:bg-[#333]"
              variant="outline"
            >
              Manage Inventory
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <div className="w-full">
          <Link to="/dashboard/getallorder">
            <Button className="flex-1 w-full" variant="secondary">
              <AlignLeft className="mr-2 h-4 w-4" />
              All Orders
            </Button>
          </Link>
        </div>
        <div className="w-full">
          <Link to="/dashboard/create-car">
            <Button className="flex-1 w-full" variant="secondary">
              <Box className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
