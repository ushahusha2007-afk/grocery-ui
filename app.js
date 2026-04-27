import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { CartProvider } from "./context/CartContext";
import Navbar          from "./components/Navbar";
import Footer          from "./components/Footer";
import HomePage        from "./pages/HomePage";
import CategoryPage    from "./pages/CategoryPage";
import CartPage        from "./pages/CartPage";
import NotFoundPage    from "./pages/NotFoundPage";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2500,
            style: {
              background: "#fff",
              color: "#111827",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              borderRadius: "12px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              padding: "12px 16px",
            },
            success: { iconTheme: { primary: "#22c55e", secondary: "#fff" } },
            error:   { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
          }}
        />
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/"             element={<HomePage />} />
              <Route path="/category/:id" element={<CategoryPage />} />
              <Route path="/cart"         element={<CartPage />} />
              <Route path="*"             element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}
