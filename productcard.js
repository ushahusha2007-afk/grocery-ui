import React, { useState } from "react";
import { ShoppingCart, Plus, Check } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addItem, isInCart } = useCart();
  const [imgError, setImgError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const inCart = isInCart(product.id);

  const handleAddToCart = () => {
    addItem(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
    toast.success(`${product.name} added to cart!`, { id: `toast-${product.id}` });
  };

  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-card card-lift border border-gray-100 flex flex-col">
      <div className="relative h-44 bg-gray-100 overflow-hidden">
        {!imgError ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={() => setImgError(true)} loading="lazy" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100 text-brand-400">
            <span className="text-4xl mb-1">🛒</span>
            <span className="text-xs text-brand-500 font-medium">No image</span>
          </div>
        )}
        {inCart && (
          <span className="absolute top-2 right-2 bg-brand-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow">In cart</span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">{product.name}</h3>
          <p className="text-xs text-gray-400 mt-0.5">per {product.unit}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${justAdded ? "bg-brand-500 text-white scale-95" : "bg-brand-50 text-brand-700 hover:bg-brand-500 hover:text-white active:scale-95"}`}
          >
            {justAdded ? (
              <><Check size={15} strokeWidth={2.5} /><span>Added!</span></>
            ) : (
              <>{inCart ? <Plus size={15} /> : <ShoppingCart size={15} />}<span>{inCart ? "Add more" : "Add"}</span></>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
