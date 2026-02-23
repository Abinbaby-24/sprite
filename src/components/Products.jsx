import "./Products.css";
import strawberryCan from "../assets/strawberry-can.png";
import blueberryCan from "../assets/blueberry-can.png";
import mangoCan from "../assets/mango-can.png";
import guavaCan from "../assets/guava-can.png";
import appleCan from "../assets/sprite-can.png";
import apple from "../assets/apple.png";
import strawberry from "../assets/strawberry.png";
import mango from "../assets/mango.png";
import blueberry from "../assets/blueberry.png";
import guava from "../assets/guava.png";
import sprite from "../assets/sprite.png";
import leaf from "../assets/leaf.png";
import { useEffect } from "react";

function Products() {

    // Mobile: flip on click
    useEffect(() => {
        if (!window.matchMedia("(hover: none)").matches) return;

        const handleTouch = (e) => {
            const card = e.target.closest(".card-inner");
            if (!card) return;
            e.preventDefault();
            card.classList.toggle("is-flipped");
        };

        document.addEventListener("touchend", handleTouch);
        return () => document.removeEventListener("touchend", handleTouch);
    }, []);

    return (
        <section id="products" className="products">
            <h2 className="products-title">PRODUCT DESCRIPTION</h2>
            <img src={sprite} className="sprite" alt="" />

            <div className="product-container">

                {/* ── Strawberry Card ── */}
                <div className="product-card">
                    <div className="card-inner">

                        <div className="card-front strawberry">
                            <img src={strawberryCan} className="can1" alt="Strawberry Can" />
                            <img src={strawberry} className="fruit fruit-left" alt="" />
                            <img src={strawberry} className="fruit fruit-left2" alt="" />
                            <img src={leaf} className="leaf leaf-left" alt="" />
                            <div className="product-info1">
                                <h3>STRAWBERRY</h3>
                            </div>
                        </div>

                        <div className="card-back strawberry">
                            <h3>STRAWBERRY</h3>
                            <p>Strawberry Fruit Pulp: 20%</p>
                            <p>Water: 77%</p>
                            <p>Sugar / Sweetener: 2.5%</p>
                            <p>Lemon Juice / Acidity Regulator: 0.3%</p>
                            <p>Permitted Natural Flavour: 0.2%</p>
                        </div>

                    </div>
                </div>

                {/* ── Blueberry Card ── */}
                <div className="product-card">
                    <div className="card-inner">

                        <div className="card-front blueberry">
                            <img src={blueberryCan} className="can2" alt="Blueberry Can" />
                            <img src={blueberry} className="fruit fruit-right" alt="" />
                            <img src={blueberry} className="fruit fruit-right2" alt="" />
                            <img src={leaf} className="leaf leaf-right" alt="" />
                            <div className="product-info2">
                                <h3>BLUEBERRY</h3>
                            </div>
                        </div>

                        <div className="card-back blueberry">
                            <h3>BLUEBERRY</h3>
                            <p>Blueberry Fruit Pulp: 20%</p>
                            <p>Water: 77%</p>
                            <p>Sugar / Sweetener: 2.5%</p>
                            <p>Lemon Juice / Acidity Regulator: 0.3%</p>
                            <p>Permitted Natural Flavour: 0.2%</p>
                        </div>

                    </div>
                </div>

                {/* ── Mango Card ── */}
                <div className="product-card">
                    <div className="card-inner">

                        <div className="card-front mango">
                            <img src={mangoCan} className="can2" alt="Mango Can" />
                            <img src={mango} className="fruit fruit-right" alt="" />
                            <img src={mango} className="fruit fruit-right2" alt="" />
                            <img src={leaf} className="leaf leaf-right" alt="" />
                            <div className="product-info2">
                                <h3>MANGO</h3>
                            </div>
                        </div>

                        <div className="card-back mango">
                            <h3>MANGO</h3>
                            <p>Mango Fruit Pulp: 20%</p>
                            <p>Water: 77%</p>
                            <p>Sugar / Sweetener: 2.5%</p>
                            <p>Lemon Juice / Acidity Regulator: 0.3%</p>
                            <p>Permitted Natural Flavour: 0.2%</p>
                        </div>

                    </div>
                </div>

                {/* ── Guava Card ── */}
                <div className="product-card">
                    <div className="card-inner">

                        <div className="card-front guava">
                            <img src={guavaCan} className="can2" alt="Guava Can" />
                            <img src={guava} className="fruit fruit-right" alt="" />
                            <img src={guava} className="fruit fruit-right2" alt="" />
                            <img src={leaf} className="leaf leaf-right" alt="" />
                            <div className="product-info2">
                                <h3>GUAVA</h3>
                            </div>
                        </div>

                        <div className="card-back guava">
                            <h3>GUAVA</h3>
                            <p>Guava Fruit Pulp: 20%</p>
                            <p>Water: 77%</p>
                            <p>Sugar / Sweetener: 2.5%</p>
                            <p>Lemon Juice / Acidity Regulator: 0.3%</p>
                            <p>Permitted Natural Flavour: 0.2%</p>
                        </div>

                    </div>
                </div>

                {/* ── Green Apple Card ── */}
                <div className="product-card">
                    <div className="card-inner">

                        <div className="card-front applee">
                            <img src={appleCan} className="can2" alt="Apple Can" />
                            <img src={apple} className="fruit fruit-right" alt="" />
                            <img src={apple} className="fruit fruit-right2" alt="" />
                            <img src={leaf} className="leaf leaf-right" alt="" />
                            <div className="product-info2">
                                <h3>GREEN APPLE</h3>
                            </div>
                        </div>

                        <div className="card-back applee">
                            <h3>GREEN APPLE</h3>
                            <p>Apple Fruit Pulp: 20%</p>
                            <p>Water: 77%</p>
                            <p>Sugar / Sweetener: 2.5%</p>
                            <p>Lemon Juice / Acidity Regulator: 0.3%</p>
                            <p>Permitted Natural Flavour: 0.2%</p>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}

export default Products;