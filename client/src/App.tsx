import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "./pages/Shop";
import Navbar from "./layouts/Navbar";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import SingleProduct from "./pages/SingleProduct";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import ShoppingCart from "./pages/User/ShoppingCart";
import ShippingAddressPage from "./pages/User/ShippingAddress";
import Payment from "./pages/User/Payment";
import ProtectedRoute from "./components/User/ProtectedRoute";
import PlaceOrderPage from "./pages/User/PlaceOrder";
import Order from "./pages/User/Order";
import OrderHistory from "./pages/User/OrderHistory";
import Profile from "./pages/User/Profile";
import Search from "./pages/Search";
import AdminRoute from "./components/User/AdminRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardProducts from "./pages/Dashboard/DashboardProducts";
import DashboardUsers from "./pages/Dashboard/DashboardUsers";
import DashboardNewOrders from "./pages/Dashboard/DashboardNewOrders";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:slug" element={<SingleProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="" element={<AdminRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/products" element={<DashboardProducts />} />
          <Route path="/dashboard/users" element={<DashboardUsers />} />
          <Route path="/dashboard/newOrders" element={<DashboardNewOrders />} />
        </Route>
        <Route path="" element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/shipping" element={<ShippingAddressPage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/placeorder" element={<PlaceOrderPage />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/order/history" element={<OrderHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
