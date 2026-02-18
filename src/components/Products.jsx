import "./Products.css";
import strawberryCan from "../assets/strawberry-can.png";
import blueberryCan from "../assets/blueberry-can.png";
import strawberry from "../assets/strawberry.png";
import blueberry from "../assets/blueberry.png";
import leaf from "../assets/leaf.png";
import sprite from "../assets/sprite.png";

function Products() {
    return (
        <section className="products">
            <h2 className="products-title">OTHER PRODUCTS</h2>
            <img src={sprite} className="sprite" />

            <div className="product-container">

                {/* Strawberry Card */}
                <div className="product-card strawberry">
                    <img src={strawberryCan} className="can1" />
                    <img src={strawberry} className="fruit fruit-left" />
                    <img src={strawberry} className="fruit fruit-left2" />
                    <img src={leaf} className="leaf leaf-left" />

                    <div className="product-info1">
                        <h3>STRAWBERRY</h3>

                        <p style={{ color: "white" }}>Strawberry Fruit Pulp: 20%</p>
                        <p style={{ color: "white" }}>Water: 77%</p>
                        <p style={{ color: "white" }}>Sugar / Sweetener: 2.5%</p>
                        <p style={{ color: "white" }}>Lemon Juice / Acidity Regulator: 0.3%</p>
                        <p style={{ color: "white" }}>Permitted Natural Flavour: 0.2%</p>

                    </div>
                </div>

                {/* Blueberry Card */}
                <div className="product-card blueberry">
                    <img src={blueberryCan} className="can2" />
                    <img src={blueberry} className="fruit fruit-right" />
                    <img src={blueberry} className="fruit fruit-right2" />
                    <img src={leaf} className="leaf leaf-right" />

                    <div className="product-info2">
                        <h3>BLUEBERRY</h3>
                        <p>Blueberry Fruit Pulp: 20%</p>
                        <p>Water: 77%</p>
                        <p>Sugar / Sweetener: 2.5%</p>
                        <p>Lemon Juice / Acidity Regulator: 0.3%</p>
                        <p>Permitted Natural Flavour: 0.2%</p>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Products;
