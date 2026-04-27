import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, Leaf } from "lucide-react";
import { useCart } from "../context/CartContext";
import { categories } from "../data/products";

export default function Navbar() {
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setMobileOpen(false), [location]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLink = "text-gray-600 hover:text-brand-600 font-medium transition-colors duration-150";
  const activeLink = "text-brand-600 font-semibold";

  return (
    <header className={`sticky top-0 z-50 bg-white border-b border-gray-100 transition-shadow duration-200 ${scrolled ? "shadow-md" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="flex items-center justify-center w-8 h-8 bg-brand-500 rounded-lg">
              <Leaf size={18} className="text-white" strokeWidth={2.5} />
            </span>
            <span className="font-display text-xl font-bold text-gray-900">
              Fresh<span className="text-brand-600">Mart</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/" end className={({ isActive }) => `${navLink} ${isActive ? activeLink : ""}`}>
              Home
            </NavLink>

            <div className="relative group">
              <button className={`${navLink} flex items-center gap-1`}>
                Categories
                <svg className="w-4 h-4 opacity-60 group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                {categories.map(cat => (
                  <Link key={cat.id} to={`/category/${cat.id}`} className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-brand-50 hover:text-brand-700 transition-colors">
                    <span className="text-lg">{cat.emoji}</span>
                    <span className="font-medium">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/cart" className="relative flex items-center gap-2 px-3 py-2 bg-brand-50 hover:bg-brand-100 rounded-xl text-brand-700 font-semibold transition-colors">
              <ShoppingCart size={20} />
              <span className="hidden sm:block text-sm">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[20px] h-5 px-1 bg-accent-500 text-white text-[11px] font-bold rounded-full animate-fade-in">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            <button onClick={() => setMobileOpen(o => !o)} className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white animate-slide-up">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            <NavLink to="/" end className={({ isActive }) => `block px-4 py-3 rounded-xl font-medium transition-colors ${isActive ? "bg-brand-50 text-brand-700" : "text-gray-700 hover:bg-gray-50"}`}>
              🏠 Home
            </NavLink>
            <p className="px-4 pt-2 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Categories</p>
            {categories.map(cat => (
              <NavLink key={cat.id} to={`/category/${cat.id}`} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${isActive ? "bg-brand-50 text-brand-700" : "text-gray-700 hover:bg-gray-50"}`}>
                <span className="text-lg">{cat.emoji}</span>
                <span>{cat.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
