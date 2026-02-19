import { useState } from "react";
import "./Navbar.css";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="logo">SPRITE</div>

            <div className={`nav-links ${menuOpen ? "active" : ""}`}>
                <a href="#products">FLAVOURS</a>
                <a href="#">CUSTOMER SERVICES</a>
                <a href="#about">ABOUT US</a>
                <a href="#">T&C</a>
            </div>

            <div
                className={`hamburger ${menuOpen ? "open" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    );
}

export default Navbar;
