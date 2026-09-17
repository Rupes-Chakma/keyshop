import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { LanguageProvider } from "./context/LanguageContext"; // If you want to provide Language Context here
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTopButton from "./components/layout/ScrollToTopButton"; // 1. Import ScrollToTopButton component
import LiveChat from "./components/trust/LiveChat"; // Import LiveChat component
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-blue-500 selection:text-white relative">
          <Navbar />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />

          {/* Scroll to top button placed near the footer */}
          <ScrollToTopButton />
        </div>
      </Router>

      {/* Floating Live Chat widget placed outside the Router to stay persistent across all pages */}
      <LiveChat />
    </CartProvider>
  );
}
