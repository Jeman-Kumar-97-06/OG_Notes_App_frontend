import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Minimalist E‑commerce single-file React component (Tailwind CSS assumed)
// Style notes:
// - Monochromatic base (grays/whites)
// - Neon yellow accent for CTAs (neon lamp feel)
// - Clean lines, lots of whitespace
// - Subtle Paul Klee–inspired abstract SVG in the background (pastel)

const PRODUCTS = [
  {
    id: 1,
    name: "Contour Chair",
    price: 249,
    description: "Sculptural seat — smooth curves, honest materials.",
    image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder",
  },
  {
    id: 2,
    name: "Slab Table",
    price: 379,
    description: "Minimal surface, maximum presence.",
    image: "https://images.unsplash.com/photo-1505691723518-36aee0a1b0b4?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder",
  },
  {
    id: 3,
    name: "Arc Lamp",
    price: 129,
    description: "A soft arc — warm glow with a neon edge.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder",
  },
  {
    id: 4,
    name: "Plane Rug",
    price: 89,
    description: "Flat tones, tactile finish.",
    image: "https://images.unsplash.com/photo-1549187774-b4e9b0445b3f?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder",
  },
];

export default function MinimalistEcom() {
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  function addToCart(product) {
    setCart((c) => {
      const found = c.find((it) => it.id === product.id);
      if (found) return c.map((it) => (it.id === product.id ? { ...it, qty: it.qty + 1 } : it));
      return [...c, { ...product, qty: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart((c) => c.filter((it) => it.id !== id));
  }

  const subtotal = cart.reduce((sum, it) => sum + it.price * it.qty, 0);

  const filtered = PRODUCTS.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">
      {/* Background abstract shapes — Paul Klee / pastel inspiration */}
      <svg className="pointer-events-none absolute inset-0 -z-10 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#f6f0ff" />
            <stop offset="100%" stopColor="#fffef6" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#g1)" />
        <g opacity="0.18" transform="translate(40,80) rotate(-8)">
          <ellipse cx="220" cy="100" rx="260" ry="60" fill="#f7f3ff" />
          <rect x="420" y="220" width="420" height="60" rx="8" fill="#fff7e6" />
          <circle cx="1100" cy="40" r="60" fill="#fffef0" />
        </g>
      </svg>

      <header className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-md bg-white shadow-sm flex items-center justify-center text-lg font-semibold tracking-tight">
            M
          </div>
          <div>
            <h1 className="text-xl font-medium tracking-tight">Monochrome Atelier</h1>
            <p className="text-xs text-gray-500 -mt-1">Minimal objects for modern rooms</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 bg-white px-3 py-2 rounded-lg shadow-sm">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              className="bg-transparent outline-none placeholder-gray-400 text-sm"
            />
            <button className="text-xs uppercase tracking-wide text-gray-600">Search</button>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white shadow-sm"
            aria-label="Open cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="opacity-80">
              <path d="M6 6h15l-1.5 9h-12z" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
            <span className="text-sm">Cart</span>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-300 text-black text-xs font-medium rounded-full px-2 py-0.5" style={{ boxShadow: '0 0 10px rgba(255,223,0,0.9)' }}>
                {cart.reduce((s, it) => s + it.qty, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-20">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="rounded-2xl overflow-hidden">
              <div className="relative bg-white rounded-2xl shadow-md p-10 flex flex-col lg:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h2 className="text-3xl font-semibold tracking-tight">Objects that breathe</h2>
                  <p className="mt-3 text-gray-600">A carefully curated collection of furniture and accents. Calm, pared-back forms that let the room speak.</p>

                  <div className="mt-6 flex items-center gap-4">
                    <button
                      onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}
                      className="px-6 py-3 rounded-md text-sm font-medium uppercase tracking-wide"
                      style={{
                        background: '#111827',
                        color: 'white',
                        boxShadow: '0 6px 18px rgba(16,24,40,0.12), 0 0 24px rgba(255,223,0,0.12)'
                      }}
                    >
                      Shop Collection
                    </button>

                    <button className="px-4 py-3 rounded-md text-sm font-medium border border-gray-200">Learn more</button>
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center">
                  {/* Hero image with ultra wide 'lens' feel */}
                  <div className="w-full max-w-2xl overflow-hidden rounded-lg" style={{ transform: 'perspective(1200px) rotateY(-6deg)' }}>
                    <img src={PRODUCTS[0].image} alt="hero" className="w-full h-64 object-cover" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <aside className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="text-sm font-medium">New arrivals</h3>
            <div className="mt-4 space-y-4">
              {PRODUCTS.slice(0, 3).map((p) => (
                <div key={p.id} className="flex items-center gap-4">
                  <img src={p.image} alt="thumb" className="w-16 h-12 object-cover rounded-md" />
                  <div>
                    <div className="text-sm font-medium">{p.name}</div>
                    <div className="text-xs text-gray-500">${p.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Shop</h2>
          <p className="text-sm text-gray-500 mt-1">Clean lines, honest materials.</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={() => addToCart(product)} />
            ))}
          </div>
        </section>
      </main>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300 }} className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50">
            <div className="p-6 flex items-center justify-between border-b">
              <h4 className="font-semibold">Your Cart</h4>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-500">Close</button>
            </div>

            <div className="p-6 space-y-4">
              {cart.length === 0 && <div className="text-gray-500">Cart is empty.</div>}

              {cart.map((it) => (
                <div key={it.id} className="flex items-center gap-4">
                  <img src={it.image} alt={it.name} className="w-16 h-12 object-cover rounded-md" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{it.name}</div>
                    <div className="text-xs text-gray-500">${it.price} × {it.qty}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-sm font-medium">${it.price * it.qty}</div>
                    <button onClick={() => removeFromCart(it.id)} className="text-xs text-gray-400">Remove</button>
                  </div>
                </div>
              ))}

              {cart.length > 0 && (
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between text-sm text-gray-700">
                    <span>Subtotal</span>
                    <strong>${subtotal}</strong>
                  </div>

                  <div className="mt-4">
                    <button className="w-full py-3 rounded-md font-medium" style={{ background: 'linear-gradient(90deg,#111827,#0b1220)', color: 'white', boxShadow: '0 10px 30px rgba(255,223,0,0.18)' }}>
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductCard({ product, onAdd }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm flex flex-col">
      <div className="rounded-md overflow-hidden mb-4 relative" style={{ borderRadius: 12 }}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        {/* subtle neon highlight */}
        <div className="absolute left-3 top-3 px-2 py-1 text-xs font-semibold uppercase rounded" style={{ background: 'rgba(255, 223, 0, 0.06)', color: '#ffe87a', boxShadow: '0 0 12px rgba(255,223,0,0.14)' }}>
          New
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-sm font-medium">{product.name}</h3>
        <p className="mt-1 text-xs text-gray-500">{product.description}</p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm font-semibold">${product.price}</div>
        <button
          onClick={onAdd}
          className="px-3 py-2 rounded-md text-sm font-medium"
          style={{
            background: 'transparent',
            color: '#111827',
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 6px 18px rgba(255,223,0,0.08), inset 0 -2px 6px rgba(255,223,0,0.03)'
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
