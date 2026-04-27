import React, { useState, useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Search, SlidersHorizontal, ChevronLeft } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { categories } from "../data/products";

const SORT_OPTIONS = [
  { value: "default",    label: "Default" },
  { value: "price-asc",  label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "name-asc",   label: "Name: A → Z" },
];

export default function CategoryPage() {
  const { id } = useParams();
  const category = categories.find(c => c.id === id);
  const [query, setQuery] = useState("");
  const [sort,  setSort]  = useState("default");

  if (!category) return <Navigate to="/" replace />;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const filtered = useMemo(() => {
    let list = [...category.items];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q));
    }
    if (sort === "price-asc")  list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "name-asc")   list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [category.items, query, sort]);

  return (
    <div className="animate-fade-in">
      <div className={`bg-gradient-to-br ${category.gradient} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link to="/" className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm font-medium mb-4 transition-colors">
            <ChevronLeft size={16} /> Back to Home
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-6xl">{category.emoji}</span>
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold">{category.name}</h1>
              <p className="text-white/80 mt-1">{category.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder={`Search in ${category.name}…`} value={query} onChange={e => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent" />
          </div>
          <div className="relative shrink-0">
            <SlidersHorizontal size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="appearance-none pl-8 pr-8 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-400 cursor-pointer">
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <span className="text-sm text-gray-500 shrink-0 self-center">{filtered.length} item{filtered.length !== 1 ? "s" : ""}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 animate-slide-up">
            {filtered.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
            <span className="text-6xl">🔍</span>
            <p className="text-lg font-semibold text-gray-600">No products found</p>
            <button onClick={() => setQuery("")} className="px-5 py-2 bg-brand-50 text-brand-700 font-semibold rounded-xl hover:bg-brand-100 transition-colors">Clear Search</button>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h3 className="font-display font-bold text-xl text-gray-800 mb-4">Other Categories</h3>
        <div className="flex flex-wrap gap-3">
          {categories.filter(c => c.id !== id).map(c => (
            <Link key={c.id} to={`/category/${c.id}`} className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm border transition-colors ${c.bgLight} ${c.textColor} ${c.borderColor} hover:shadow-sm`}>
              <span>{c.emoji}</span><span>{c.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
