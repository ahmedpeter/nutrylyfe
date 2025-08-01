import React, {useEffect} from "react";
import { BrowserRouter as Router, Route, Routes,  useLocation, useNavigate, Navigate } from "react-router-dom";
import Login from "./auth/login";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import Sidebar from "./builder/Sidebar";
import Header from "./builder/Header";
import ProductDetails from "./Products/details";
import Products from "./Products";
import Cart from "./Products/cart";
import NewProduct from "./Products/NewProduct";
import NewStockiest from "./Stockiest/NewStockiest";
import Networkers from "./Networkers";
import Packages from "./Packages";
import Accounts from "./Accounts";
import UserProfile from "./Networkers/UserProfile";
import AddNetworker from "./Networkers/AddNetworker";
import Stockiest from "./Stockiest";
import Dashboard from "./dashboard";
import StockiestProducts from "./Stockiest/StockiestProduct";


function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPath = location.pathname.includes("/auth");
  const isLoggedInPath = location.pathname.includes("/app");

  useEffect(() => {
    const normalizedPath = location.pathname
      .split('/')
      .map(segment => segment.toLowerCase().replace(/ /g, '-')) 
      .join('/');

    if (location.pathname !== normalizedPath) {
      navigate(normalizedPath, { replace: true });
    }
  }, [location, navigate]);

  return (
    <div>
      {!isAuthPath && (
        <>
          <Sidebar />
          <Header />
        </>
      )}
    <Routes>
              <Route path="/" element={<Navigate to="/auth/login" replace />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/forgot-password" element={<ForgotPassword />} />
              <Route path="/auth/reset-password" element={<ResetPassword />} />
    </Routes>

      <div className="main__content">
        <Routes>
          
          <Route path="/app/dashboard" element={<Dashboard />} />
          <Route path="/app/product/:prodId/details" element={<ProductDetails />} />
          <Route path="/app/product/stockiest/:stockiestId" element={<StockiestProducts />} />
          <Route path="/app/networkers" element={<Networkers />} />
          <Route path="/app/packages" element={<Packages />} />
          <Route path="/app/accounts" element={<Accounts />} />
          <Route path="/app/cart" element={<Cart />} />
          <Route path="/app/user/profile" element={<UserProfile />} />
          <Route path="/app/networker/new" element={<AddNetworker />} />
          <Route path="/app/stockiest" element={<Stockiest />} />
          <Route path="/app/products" element={<Products />} />
          <Route path="/app/product/new" element={<NewProduct />} />
          <Route path="/app/stockiest/new" element={<NewStockiest />} />
        </Routes>
      </div>
    </div>
  );
}

function Application() {
  return (
    // <Router>
      <Layout />
    // </Router>
  );
}

export default Application;