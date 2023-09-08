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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="" element={<ProtectedRoute />}>
          <Route path="/shipping" element={<ShippingAddressPage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/placeorder" element={<PlaceOrderPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
