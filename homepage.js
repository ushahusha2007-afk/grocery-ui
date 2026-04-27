import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Truck, RefreshCw, Shield } from "lucide-react";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import { categories } from "../data/products";

const featuredProducts = [
  ...categories[0].items.slice(0, 4),
  ...categories[1].items.slice(0, 4),
  ...categories[2].items.slice(0, 4),
].map(p => ({ ...p, category: categories.find(c => c.items.some(i => i.id === p.id))?.id }));

const FEATURES = [
  { icon: <Truck size={22} />,     title: "Free Delivery",    desc: "On orders above $50" },
  { icon: <RefreshCw size={22} />, title: "Easy Returns",     desc: "Hassle-free 30-day returns" },
  { icon: <Shield size={22} />,    title: "Fresh Guaranteed", desc: "Quality you can trust" },
];

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-emerald-500 text-white">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-accent-400/20 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-5 border border-white/30">
              🌿 Farm-fresh, delivered fast
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
              Groceries,<br /><span className="text-yellow-300">fresh</span> every day.
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
              Shop from 200+ quality products across fruits, vegetables, snacks, dairy, and beverages.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/category/fruits" className="flex items-center gap-2 bg-white text-brand-700 font-bold px-6 py-3 rounded-xl hover:bg-yellow-50 transition-colors shadow-lg">
                <ShoppingCart size={18} /> Shop Now
              </Link>
              <Link to="/#categories" className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/30 border border-white/30">
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Feature badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {FEATURES.map(f => (
            <div key={f.title} className="flex items-center gap-4 bg-white rounded-2xl px-6 py-4 shadow-card border border-gray-100">
              <span className="text-brand-500">{f.icon}</span>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{f.title}</p>
                <p className="text-xs text-gray-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="mb-6">
          <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-1">Browse by</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">Categories</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map(cat => <CategoryCard key={cat.id} category={cat} />)}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-1">Hand-picked</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">Featured Items</h2>
          </div>
          <Link to="/category/fruits" className="hidden sm:inline-flex items-center gap-1 text-brand-600 font-semibold text-sm hover:text-brand-700">View all →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {featuredProducts.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
        <div className="text-center mt-8">
          <Link to="/category/fruits" className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-md">
            <ShoppingCart size={18} /> Shop All Products
          </Link>
        </div>
      </section>

      {/* Promo banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="bg-gradient-to-r from-accent-500 to-yellow-400 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
          <div className="absolute -right-8 -bottom-8 text-9xl opacity-20 select-none">🛒</div>
          <div className="relative">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">New customers get 10% off!</h3>
            <p className="text-white/85 text-sm md:text-base">Use code <span className="font-bold">FRESH10</span> at checkout.</p>
          </div>
          <Link to="/category/vegetables" className="relative shrink-0 bg-white text-accent-600 font-bold px-6 py-3 rounded-xl hover:bg-gray-50 shadow-lg">Claim Offer</Link>
        </div>
      </section>
    </div>
  );
}
