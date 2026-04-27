import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 animate-fade-in">
      <div className="text-center">
        <p className="text-8xl font-display font-extrabold text-brand-200 mb-4">404</p>
        <h1 className="text-2xl font-bold text-gray-800 mb-3">Page not found</h1>
        <p className="text-gray-500 mb-8">Looks like this aisle doesn't exist!</p>
        <Link to="/" className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-8 py-3 rounded-xl transition-colors inline-block">Back to Home</Link>
      </div>
    </div>
  );
}
