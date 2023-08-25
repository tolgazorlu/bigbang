import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Navbar from "./layouts/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleProduct from "./pages/SingleProduct";

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
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<SingleProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;
