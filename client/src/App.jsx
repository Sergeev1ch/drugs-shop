import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import CouponPage from "./pages/CouponPage";
import HistoryPage from "./pages/HistoryPage";

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
            <Route key="/" path="/" element={<ShopPage />} exact />
            <Route key="/cart" path="/cart" element={<CartPage />} exact /> 
            <Route key="/coupon" path="/coupon" element={<CouponPage />} exact /> 
            <Route key="/histoty" path="/history" element={<HistoryPage />} exact /> 
            <Route key="*" path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;
