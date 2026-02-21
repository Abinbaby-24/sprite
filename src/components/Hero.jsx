import { useState, useEffect } from "react";
import "./Hero.css";

// ── Cans ──────────────────────────────────────────────────────────────────
import spriteCan from "../assets/sprite-can.png";
import strawberryCan from "../assets/strawberry-can.png";
import blueberryCan from "../assets/blueberry-can.png";
import mangoCan from "../assets/mango-can.png";
import guavaCan from "../assets/guava-can.png";

// ── Fruits ────────────────────────────────────────────────────────────────
import apple from "../assets/apple.png";
import strawberry from "../assets/strawberry.png";
import blueberry from "../assets/blueberry.png";
import mango from "../assets/mango.png";
import guava from "../assets/guava.png";

// ── Leaf (shared) ─────────────────────────────────────────────────────────
import leaf from "../assets/leaf.png";

// ── Flavour definitions ───────────────────────────────────────────────────
const FLAVOURS = [
    {
        key: "green-apple",
        label: "GREEN APPLE",
        bg: "#5dbb15",
        can: spriteCan,
        fruit: apple,
    },
    {
        key: "strawberry",
        label: "STRAWBERRY",
        bg: "#e8183a",
        can: strawberryCan,
        fruit: strawberry,
    },
    {
        key: "blueberry",
        label: "BLUEBERRY",
        bg: "#2a3bb7",
        can: blueberryCan,
        fruit: blueberry,
    },
    {
        key: "guava",
        label: "GUAVA",
        bg: "#e05c9a",
        can: guavaCan,
        fruit: guava,
    },
    {
        key: "mango",
        label: "MANGO",
        bg: "#f5a623",
        can: mangoCan,
        fruit: mango,
    },
];

const INTERVAL = 3000;

export default function Hero() {
    const [current, setCurrent] = useState(0);
    const [animKey, setAnimKey] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % FLAVOURS.length);
            setAnimKey(prev => prev + 1);
        }, INTERVAL);
        return () => clearInterval(timer);
    }, []);

    const f = FLAVOURS[current];

    return (
        <div className="hero" style={{ backgroundColor: f.bg }}>

            {/* ── Title ─────────────────────────────────────────────── */}
            <h1 key={`title-${animKey}`} className="title slide-in">
                {f.label}
            </h1>

            {/* ── Can ───────────────────────────────────────────────── */}
            <img
                key={`can-${animKey}`}
                src={f.can}
                className="can slide-in-can"
                alt={`${f.label} can`}
            />

            {/* ── Fruit decorations ─────────────────────────────────── */}
            <img key={`a1-${animKey}`} src={f.fruit} className="apple appleLeft   slide-in-fruit" alt="" />
            <img key={`a2-${animKey}`} src={f.fruit} className="apple appleRight  slide-in-fruit" alt="" />
            <img key={`a3-${animKey}`} src={f.fruit} className="apple appleRight2 slide-in-fruit" alt="" />
            <img key={`a4-${animKey}`} src={f.fruit} className="apple appleLeft2  slide-in-fruit" alt="" />
            <img key={`a5-${animKey}`} src={f.fruit} className="apple appleRight3 slide-in-fruit" alt="" />

            {/* ── Leaves (shared across all flavours) ───────────────── */}
            <img key={`l1-${animKey}`} src={leaf} className="leaf leaf1 slide-in-leaf" alt="" />
            <img key={`l2-${animKey}`} src={leaf} className="leaf leaf2 slide-in-leaf" alt="" />
            <img key={`l3-${animKey}`} src={leaf} className="leaf leaf3 slide-in-leaf" alt="" />

            {/* ── Dot indicators ────────────────────────────────────── */}
            <div className="dots">
                {FLAVOURS.map((flv, i) => (
                    <button
                        key={flv.key}
                        className={`dot ${i === current ? "dot--active" : ""}`}
                        onClick={() => { setCurrent(i); setAnimKey(prev => prev + 1); }}
                        aria-label={flv.label}
                    />
                ))}
            </div>

            {/* ── Buttons (constant) ────────────────────────────────── */}
            <div className="buttons">
                <button className="btn">ADD TO CART</button>
                <a href="#products">
                    <button className="btn btn2">MORE FLAVOURS</button>
                </a>
            </div>
        </div>
    );
}