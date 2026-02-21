import { useState, useEffect, useRef } from "react";

import strawberryCan from "../assets/strawberry-can.png";
import blueberryCan from "../assets/blueberry-can.png";
import mangoCan from "../assets/mango-can.png";
import guavaCan from "../assets/guava-can.png";
import spriteCan from "../assets/sprite-can.png";

import apple from "../assets/apple.png";
import strawberry from "../assets/strawberry.png";
import mango from "../assets/mango.png";
import blueberry from "../assets/blueberry.png";
import guava from "../assets/guava.png";
import sprite from "../assets/sprite.png";

import lal from "../assets/mohanlal.jpeg";

const PAYMENT_SUCCESS_IMAGE = null;
const BG_LOGO_IMAGE = sprite;

const PRODUCT_IMAGES = {
    1: strawberryCan,
    2: blueberryCan,
    3: mangoCan,
    4: guavaCan,
    5: spriteCan,
};

const FRUIT_POP_IMAGES = {
    1: strawberry,
    2: blueberry,
    3: mango,
    4: guava,
    5: apple,
};

const FRUIT_FALLBACK_EMOJI = {
    1: "🍓",
    2: "🫐",
    3: "🥭",
    4: "🍈",
    5: "🍏",
};

const PRICE = 30;
const CART_STORAGE_KEY = "sprite_cart";

const products = [
    { id: 1, name: "Sprite Strawberry", bg: "#e8004d", textColor: "#ff6b9d", canColor: "#f47aa0" },
    { id: 2, name: "Sprite Blueberry", bg: "#6b21a8", textColor: "#c084fc", canColor: "#818cf8" },
    { id: 3, name: "Sprite Mango", bg: "#d97706", textColor: "#fbbf24", canColor: "#fcd34d" },
    { id: 4, name: "Sprite Guava", bg: "#ec4899", textColor: "#f9a8d4", canColor: "#86efac" },
    { id: 5, name: "Sprite Green Apple", bg: "#166534", textColor: "#86efac", canColor: "#4ade80" },
];

/* ---------- Payment Success Modal ---------- */
function PaymentSuccessModal({ total, onClose }) {
    return (
        <div
            style={{
                position: "fixed", inset: 0, background: "rgba(0,0,0,0.72)",
                zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center",
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: "#fff", borderRadius: 24, padding: 28,
                    minWidth: 300, maxWidth: 380, width: "90%",
                    boxShadow: "0 24px 64px rgba(0,0,0,0.55)",
                    fontFamily: "'Trebuchet MS', sans-serif",
                    animation: "popIn 0.32s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    textAlign: "center",
                }}
                onClick={e => e.stopPropagation()}
            >
                <style>{`
          @keyframes popIn {
            from { transform: scale(0.7); opacity: 0; }
            to   { transform: scale(1);   opacity: 1; }
          }
        `}</style>

                <div style={{
                    width: "100%", borderRadius: 16, overflow: "hidden",
                    marginBottom: 20, background: "#f0fdf4", minHeight: 180,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "2px dashed #86efac",
                }}>
                    {lal ? (
                        <img src={lal} alt="Payment success"
                            style={{ width: "100%", objectFit: "cover", display: "block", borderRadius: 14 }} />
                    ) : (
                        <div style={{ padding: 28, textAlign: "center" }}>
                            <div style={{ fontSize: 52, marginBottom: 10 }}>🖼️</div>
                            <div style={{ fontSize: 12, color: "#aaa", lineHeight: 1.6 }}>
                                Your photo will appear here.
                            </div>
                        </div>
                    )}
                </div>

                <div style={{ fontSize: 36, marginBottom: 6 }}>✌️</div>
                <div style={{ fontWeight: 900, fontSize: 22, color: "#166534", letterSpacing: 1, marginBottom: 6 }}>
                    THIS IS A FAN-MADE PROJECT
                </div>
                <div style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>
                    THESE PRODUCTS DON'T EVEN EXIST
                </div>

                <button
                    onClick={onClose}
                    style={{
                        width: "100%", padding: "13px 0", borderRadius: 12,
                        background: "#5dbb15", border: "none", color: "white",
                        fontWeight: 900, fontSize: 15, letterSpacing: 2,
                        cursor: "pointer", textTransform: "uppercase", transition: "background 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#4aaa00"}
                    onMouseLeave={e => e.currentTarget.style.background = "#5dbb15"}
                >
                    APO OKE BYE
                </button>
            </div>
        </div>
    );
}

/* ---------- Fruit Particle ---------- */
function FruitParticle({ img, emoji, startX, startY, angle, speed, id, onDone }) {
    const [pos, setPos] = useState({ x: startX, y: startY, opacity: 1, scale: 1 });
    const frame = useRef(0);
    const raf = useRef(null);

    useEffect(() => {
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        let x = startX, y = startY, opacity = 1, scale = 1;
        const animate = () => {
            frame.current++;
            x += vx;
            y += vy + frame.current * 0.13;
            opacity -= 0.022;
            scale += 0.02;
            if (opacity <= 0) { onDone(id); return; }
            setPos({ x, y, opacity, scale });
            raf.current = requestAnimationFrame(animate);
        };
        raf.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf.current);
    }, []);

    return (
        <div style={{
            position: "fixed", left: pos.x, top: pos.y,
            width: 36, height: 36, opacity: pos.opacity,
            transform: `translate(-50%,-50%) scale(${pos.scale})`,
            pointerEvents: "none", zIndex: 9999, userSelect: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
        }}>
            {img
                ? <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                : <span style={{ fontSize: 28 }}>{emoji}</span>
            }
        </div>
    );
}

function useFruitPop() {
    const [particles, setParticles] = useState([]);
    const idRef = useRef(0);
    const pop = (x, y, productId) => {
        const count = 12;
        const img = FRUIT_POP_IMAGES[productId];
        const emoji = FRUIT_FALLBACK_EMOJI[productId];
        const newParticles = Array.from({ length: count }, (_, i) => ({
            id: idRef.current++, img, emoji, startX: x, startY: y,
            angle: (Math.PI * 2 * i) / count - Math.PI / 2 + (Math.random() - 0.5) * 0.9,
            speed: 3.5 + Math.random() * 5,
        }));
        setParticles(p => [...p, ...newParticles]);
    };
    const remove = (id) => setParticles(p => p.filter(pt => pt.id !== id));
    return { particles, pop, remove };
}

/* ---------- Product Card ---------- */
function ProductCard({ product, onAddToCart, fruitPop, onViewCart }) {
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);
    const addBtnRef = useRef(null);

    const handleAdd = () => {
        if (added) return;
        setAdded(true);
        onAddToCart(product, qty);
        if (addBtnRef.current) {
            const rect = addBtnRef.current.getBoundingClientRect();
            fruitPop.pop(rect.left + rect.width / 2, rect.top + rect.height / 2, product.id);
        }
        setTimeout(() => setAdded(false), 900);
    };

    const canImg = PRODUCT_IMAGES[product.id];

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, fontFamily: "'Trebuchet MS', sans-serif" }}>

            <div style={{
                width: 200, height: 240, borderRadius: 20, background: product.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "3px solid white", boxShadow: `0 8px 36px rgba(0,0,0,0.3)`,
                cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s",
                position: "relative", overflow: "hidden",
            }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 8px 36px rgba(0,0,0,0.3)"; }}
            >
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
                    {BG_LOGO_IMAGE
                        ? <img src={BG_LOGO_IMAGE} alt="" style={{ width: "85%", objectFit: "contain", opacity: 0.13 }} />
                        : <span style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", fontWeight: 900, fontSize: 56, color: "rgba(255,255,255,0.13)", letterSpacing: -2, userSelect: "none", whiteSpace: "nowrap" }}>Sprite</span>
                    }
                </div>
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 28% 20%, rgba(255,255,255,0.22), transparent 60%)", pointerEvents: "none", zIndex: 1 }} />
                <div style={{
                    width: "85%", height: "88%", borderRadius: 14, zIndex: 2,
                    background: canImg ? "transparent" : `linear-gradient(135deg, ${product.canColor}bb, ${product.canColor}44)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: canImg ? "none" : `0 8px 28px ${product.canColor}88`,
                    border: canImg ? "none" : `2px solid ${product.canColor}99`,
                    position: "relative", overflow: "hidden",
                }}>
                    {canImg
                        ? <img src={canImg} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                        : (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                                <div style={{ width: 44, height: 44, borderRadius: "50%", border: "2px dashed rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🖼️</div>
                                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", textAlign: "center", lineHeight: 1.3 }}>Add can<br />image</span>
                            </div>
                        )
                    }
                </div>
            </div>

            <div style={{ fontWeight: 700, fontSize: 13, color: "rgba(255,255,255,0.92)", letterSpacing: 0.5, textAlign: "center" }}>{product.name}</div>
            <div style={{ fontWeight: 900, fontSize: 22, color: "#fff", letterSpacing: 1, textShadow: "0 1px 6px rgba(0,0,0,0.25)" }}>₹{PRICE * qty}</div>

            <div style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.15)", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.35)" }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                    style={{ width: 34, height: 34, background: "none", border: "none", color: "white", fontSize: 22, fontWeight: 900, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
                    onMouseLeave={e => e.currentTarget.style.background = "none"}
                >−</button>
                <div style={{ width: 44, height: 34, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, color: "white" }}>{qty}</div>
                <button onClick={() => setQty(q => q + 1)}
                    style={{ width: 34, height: 34, background: "none", border: "none", color: "white", fontSize: 22, fontWeight: 900, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
                    onMouseLeave={e => e.currentTarget.style.background = "none"}
                >+</button>
            </div>

            <button ref={addBtnRef} onClick={handleAdd}
                style={{
                    width: 200, padding: "10px 0", borderRadius: 8,
                    background: added ? "#22c55e" : "rgba(255,255,255,0.22)",
                    border: "2px solid white", color: "white",
                    fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 900, fontSize: 15,
                    letterSpacing: 2, cursor: "pointer", transition: "all 0.2s",
                    textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
                onMouseEnter={e => { if (!added) e.currentTarget.style.background = "rgba(255,255,255,0.38)"; }}
                onMouseLeave={e => { if (!added) e.currentTarget.style.background = "rgba(255,255,255,0.22)"; }}
            >
                <span style={{ fontSize: 18 }}>{added ? "✅" : "🛒"}</span>
                {added ? "Added!" : "Add"}
            </button>

            <button onClick={onViewCart}
                style={{
                    width: 200, padding: "8px 0", borderRadius: 8,
                    background: "rgba(0,0,0,0.2)", border: "1.5px solid rgba(255,255,255,0.4)",
                    color: "rgba(255,255,255,0.92)", fontFamily: "'Trebuchet MS', sans-serif",
                    fontWeight: 700, fontSize: 12, letterSpacing: 2, cursor: "pointer",
                    transition: "all 0.2s", textTransform: "uppercase",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.2)"}
            >👜 View Cart</button>
        </div>
    );
}

/* ---------- Cart Modal ---------- */
function CartModal({ cart, onClose, onClearCart, onPaySuccess }) {
    const total = cart.reduce((s, i) => s + PRICE * i.qty, 0);
    const handleProceed = () => { onClose(); onPaySuccess(total); };

    return (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
            <div style={{ background: "#fff", borderRadius: 20, padding: 28, minWidth: 320, maxWidth: 420, width: "90%", boxShadow: "0 24px 64px rgba(0,0,0,0.45)", fontFamily: "'Trebuchet MS', sans-serif", animation: "slideUp 0.25s ease" }} onClick={e => e.stopPropagation()}>
                <style>{`@keyframes slideUp { from { transform:translateY(30px); opacity:0; } to { transform:translateY(0); opacity:1; } }`}</style>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <div style={{ fontWeight: 900, fontSize: 20, letterSpacing: 2, textTransform: "uppercase", color: "#166534" }}>🛒 Your Cart</div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        {cart.length > 0 && (
                            <button onClick={onClearCart} style={{ background: "none", border: "1px solid #fca5a5", borderRadius: 6, fontSize: 11, color: "#ef4444", cursor: "pointer", padding: "3px 8px", fontWeight: 700, letterSpacing: 1 }}>Clear</button>
                        )}
                        <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#999", lineHeight: 1 }}>✕</button>
                    </div>
                </div>

                {cart.length === 0 ? (
                    <div style={{ color: "#aaa", textAlign: "center", padding: "28px 0", fontSize: 15 }}>Your cart is empty 🥤</div>
                ) : (
                    <>
                        {cart.map((item, i) => {
                            const canImg = PRODUCT_IMAGES[item.id];
                            const emoji = FRUIT_FALLBACK_EMOJI[item.id];
                            return (
                                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f0f0f0" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <div style={{ width: 40, height: 40, borderRadius: 8, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
                                            {canImg ? <img src={canImg} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} /> : <span style={{ fontSize: 22 }}>{emoji}</span>}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: 14 }}>{item.name}</div>
                                            <div style={{ fontSize: 12, color: "#888" }}>Qty: {item.qty} × ₹{PRICE}</div>
                                        </div>
                                    </div>
                                    <div style={{ fontWeight: 900, color: "#166534", fontSize: 16 }}>₹{PRICE * item.qty}</div>
                                </div>
                            );
                        })}
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 18, fontWeight: 900, fontSize: 20, paddingTop: 12, borderTop: "2px solid #e8f5e9" }}>
                            <span>Total</span><span style={{ color: "#166534" }}>₹{total}</span>
                        </div>
                    </>
                )}

                <button
                    onClick={handleProceed}
                    disabled={cart.length === 0}
                    style={{
                        marginTop: 20, width: "100%", padding: "14px 0", borderRadius: 12,
                        background: cart.length === 0 ? "#ccc" : "#5dbb15",
                        border: "none", color: "white", fontWeight: 900, fontSize: 15,
                        letterSpacing: 2, cursor: cart.length === 0 ? "not-allowed" : "pointer",
                        textTransform: "uppercase", transition: "background 0.2s",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    }}
                    onMouseEnter={e => { if (cart.length > 0) e.currentTarget.style.background = "#4aaa00"; }}
                    onMouseLeave={e => { if (cart.length > 0) e.currentTarget.style.background = "#5dbb15"; }}
                >
                    💳 Proceed to Pay {cart.length > 0 && `· ₹${total}`}
                </button>
            </div>
        </div>
    );
}

/* ---------- App ---------- */
export default function AddToCart() {
    const [cart, setCart] = useState(() => {
        try {
            const saved = localStorage.getItem(CART_STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch { return []; }
    });
    const [cartOpen, setCartOpen] = useState(false);
    const [paySuccess, setPaySuccess] = useState(null);
    const fruitPop = useFruitPop();

    useEffect(() => {
        try { localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart)); } catch { }
    }, [cart]);

    const totalItems = cart.reduce((s, i) => s + i.qty, 0);

    const handleAddToCart = (product, qty) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === product.id);
            if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
            return [...prev, { ...product, qty }];
        });
    };

    const handlePaySuccess = (total) => {
        setCart([]);
        setPaySuccess(total);
    };

    return (
        // ── min-height removed so page doesn't stretch beyond content ──
        <div style={{
            background: "#5dbb15",
            padding: "28px 24px 48px",
            fontFamily: "'Trebuchet MS', sans-serif",
            position: "relative",
            overflow: "hidden",
        }}>

            <style>{`
        /* ── Responsive grid centering ── */
        #addtocart {
          display: flex;
          flex-wrap: wrap;
          gap: 28px;
          justify-content: center;   /* center on ALL screen sizes */
          position: relative;
          z-index: 1;
        }
      `}</style>

            {/* Background watermark */}
            <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {BG_LOGO_IMAGE
                    ? <img src={BG_LOGO_IMAGE} alt="" style={{ width: "60vw", maxWidth: 520, opacity: 0.09, objectFit: "contain" }} />
                    : <span style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", fontWeight: 900, fontSize: "clamp(90px, 24vw, 280px)", color: "rgba(255,255,255,0.08)", letterSpacing: -6, userSelect: "none", whiteSpace: "nowrap" }}>Sprite</span>
                }
            </div>

            {fruitPop.particles.map(p => <FruitParticle key={p.id} {...p} onDone={fruitPop.remove} />)}

            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36, position: "relative", zIndex: 1 }}>
                <h1 style={{ color: "white", fontWeight: 900, fontSize: 22, letterSpacing: 3, textTransform: "uppercase", margin: 0, textShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>Add to Cart</h1>
                <button
                    onClick={() => setCartOpen(true)}
                    style={{ background: "rgba(255,255,255,0.2)", border: "2px solid white", borderRadius: 40, padding: "8px 20px", color: "white", fontWeight: 900, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, letterSpacing: 1, transition: "background 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.32)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
                >
                    🛒
                    {totalItems > 0 && (
                        <span style={{ background: "#ff3d3d", borderRadius: "50%", width: 22, height: 22, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900 }}>
                            {totalItems}
                        </span>
                    )}
                    Cart
                </button>
            </div>

            {/* ✅ Cards grid — centered on all screen sizes, no vacant space */}
            <div id="addtocart">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                        fruitPop={fruitPop}
                        onViewCart={() => setCartOpen(true)}
                    />
                ))}
            </div>

            {cartOpen && <CartModal cart={cart} onClose={() => setCartOpen(false)} onClearCart={() => setCart([])} onPaySuccess={handlePaySuccess} />}
            {paySuccess !== null && <PaymentSuccessModal total={paySuccess} onClose={() => setPaySuccess(null)} />}
        </div>
    );
}