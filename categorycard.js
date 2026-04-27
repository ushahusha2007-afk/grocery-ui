import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CategoryCard({ category }) {
  const { id, name, emoji, description, gradient, bgLight, textColor } = category;
  return (
    <Link to={`/category/${id}`} className={`group relative flex flex-col items-start gap-3 p-6 rounded-2xl border-2 border-transparent hover:border-white ${bgLight} card-lift overflow-hidden cursor-pointer`}>
      <div className={`absolute -right-6 -top-6 w-28 h-28 rounded-full bg-gradient-to-br ${gradient} opacity-20 group-hover:opacity-35 transition-opacity duration-300`} />
      <span className="relative text-5xl select-none group-hover:scale-110 transition-transform duration-300 inline-block">{emoji}</span>
      <div className="relative">
        <h3 className={`font-display font-bold text-xl ${textColor} leading-tight`}>{name}</h3>
        <p className="text-gray-500 text-sm mt-0.5">{description}</p>
      </div>
      <div className={`relative flex items-center gap-2 mt-auto text-sm font-semibold ${textColor}`}>
        <span>{category.items.length} items</span>
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
      </div>
    </Link>
  );
}
