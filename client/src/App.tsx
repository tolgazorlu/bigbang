import { useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "./pages/Shop";
import Navbar from "./layouts/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleProduct from "./pages/SingleProduct";
import NotFound from "./pages/NotFound";
import Dashborad from "./pages/Dashborad";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import { Store } from "./Store";
import ShoppingCart from "./pages/ShoppingCart";

const App = () => {
  const [cookies, removeCookie] = useCookies(["token"]);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const verifyCookie = () => {
      if (!cookies.token) {
        setIsAuth(false);
      }
      setIsAuth(true);
    };
    verifyCookie();
  }, [cookies, isAuth, removeCookie]);

  return (
      <BrowserRouter>
        <Navbar isAuth={isAuth} cookies={cookies} />
        <Routes>
        <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/landing" element={<Landing />} />
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
