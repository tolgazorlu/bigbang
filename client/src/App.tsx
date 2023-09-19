import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "./pages/Shop";
import Navbar from "./layouts/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleProduct from "./pages/SingleProduct";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import ShoppingCart from "./pages/ShoppingCart";
import ShippingAddressPage from "./pages/ShippingAddress";
import Payment from "./pages/Payment";
import ProtectedRoute from "./components/ProtectedRoute";
import PlaceOrderPage from "./pages/PlaceOrder";
import Order from "./pages/Order";
import OrderHistory from "./pages/OrderHistory";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import AdminRoute from "./components/AdminRoute";
import Dashboard from "./pages/Dashboard";
import DashboardProducts from "./pages/DashboardProducts";
import DashboardUsers from "./pages/DashboardUsers";

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
