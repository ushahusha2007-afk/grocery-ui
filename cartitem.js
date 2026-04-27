import React, { useState } from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function CartItem({ item }) {
  const { removeItem, incrementQty, decrementQty } = useCart();
  const [imgError, setImgError] = useState(false);

  const handleRemove = () => {
    removeItem(item.id);
    toast(`${item.name} removed`, { icon: "🗑️" });
  };

  return (
    <div className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-card border border-gray-100 animate-fade-in">
      <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
        {!imgError ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={() => setImgError(true)} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl bg-brand-50">🛒</div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 text-sm leading-snug truncate">{item.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">per {item.unit}</p>
        <p className="text-brand-600 font-bold text-base mt-1">${(item.price * item.quantity).toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button onClick={() => decrementQty(item.id)} disabled={item.quantity <= 1} className="qty-btn disabled:opacity-40 disabled:cursor-not-allowed">
          <Minus size={14} />
        </button>
        <span className="w-8 text-center font-bold text-gray-900">{item.quantity}</span>
        <button onClick={() => incrementQty(item.id)} className="qty-btn">
          <Plus size={14} />
        </button>
      </div>

      <button onClick={handleRemove} className="shrink-0 p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
        <Trash2 size={18} />
      </button>
    </div>
  );
}
