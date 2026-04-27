import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, ArrowLeft, CheckCircle } from "lucide-react";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const DELIVERY_THRESHOLD = 50;
const DELIVERY_FEE = 4.99;
const TAX_RATE = 0.08;

export default function CartPage() {
  const { items, totalPrice, itemCount, clearCart } = useCart();
  const [ordered, setOrdered] = useState(false);

  const delivery   = totalPrice >= DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const tax        = totalPrice * TAX_RATE;
  const grandTotal = totalPrice + delivery + tax;

  const handleCheckout = () => {
    setOrdered(true);
    clearCart();
    toast.success("Order placed successfully! 🎉", { duration: 4000 });
  };

  if (ordered) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 animate-fade-in">
        <div className="text-center max-w-md">
          <CheckCircle size={72} className="text-brand-500 mx-auto mb-6" strokeWidth={1.5} />
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-3">Order Confirmed!</h2>
          <p className="text-gray-500 mb-8">Thank you for shopping with FreshMart. Your groceries are on the way! 🥦🍎</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg">
            <ArrowLeft size={18} /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[65vh] flex items-center justify-center px-4 animate-fade-in">
        <div className="text-center max-w-sm">
          <ShoppingCart size={72} className="text-gray-300 mx-auto mb-6" strokeWidth={1.2} />
          <h2 className="font-display text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-7 text-sm">Browse our fresh produce and add some items!</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold px-7 py-3 rounded-xl shadow-md">
            <ArrowLeft size={18} /> Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900">My Cart</h1>
          <p className="text-gray-500 mt-1 text-sm">{itemCount} item{itemCount !== 1 ? "s" : ""} in your cart</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-brand-600 text-sm font-medium">
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
          <button onClick={() => { clearCart(); toast("Cart cleared", { icon: "🗑️" }); }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-500 hover:text-red-600 hover:bg-red-50 border border-red-200 rounded-xl">
            <Trash2 size={15} /> Clear All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-3">
          {items.map(item => <CartItem key={item.id} item={item} />)}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 sticky top-24">
            <h2 className="font-display font-bold text-xl text-gray-900 mb-5">Order Summary</h2>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({itemCount} items)</span>
                <span className="font-semibold text-gray-900">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery fee</span>
                {delivery === 0
                  ? <span className="text-brand-600 font-semibold">FREE</span>
                  : <span className="font-semibold text-gray-900">${delivery.toFixed(2)}</span>
                }
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (8%)</span>
                <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
              </div>
            </div>

            {delivery > 0 && (
              <div className="mt-4 p-3 bg-brand-50 rounded-xl border border-brand-100">
                <p className="text-xs text-brand-700 font-medium mb-2">
                  Add <strong>${(DELIVERY_THRESHOLD - totalPrice).toFixed(2)}</strong> more for free delivery!
                </p>
                <div className="h-2 bg-brand-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((totalPrice / DELIVERY_THRESHOLD) * 100, 100)}%` }} />
                </div>
              </div>
            )}

            {delivery === 0 && (
              <div className="mt-4 p-3 bg-brand-50 rounded-xl border border-brand-100 text-xs text-brand-700 font-medium">
                🎉 You've unlocked free delivery!
              </div>
            )}

            <div className="border-t border-gray-100 my-5" />
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-900 text-base">Total</span>
              <span className="font-display font-extrabold text-2xl text-brand-600">${grandTotal.toFixed(2)}</span>
            </div>

            <button onClick={handleCheckout}
              className="w-full mt-6 bg-brand-500 hover:bg-brand-600 active:scale-95 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md text-base">
              Proceed to Checkout →
            </button>
            <div className="mt-4 flex items-center justify-center gap-4 text-gray-400 text-xs">
              <span>🔒 Secure checkout</span>
              <span>🌿 Fresh guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
