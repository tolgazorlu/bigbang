import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "./pages/Shop";
import Navbar from "./layouts/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleProduct from "./pages/SingleProduct";
import NotFound from "./pages/NotFound";
import Dashborad from "./pages/Dashborad";
import Home from "./pages/Home";
import ShoppingCart from "./pages/ShoppingCart";

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
        <Route path="/dashboard" element={<Dashborad />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
