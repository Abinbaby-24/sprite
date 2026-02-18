import "./About.css";
import sprite from "../assets/sprite.png";

function About() {
    return (
        <section className="About">
            <h1 >ABOUT US</h1>
            <img src={sprite} className="sprite1" />


            <div className="about-grid">

                <div className="about-card">
                    <h3>Who We Are</h3>
                    <p className="para">
                        We are a modern beverage brand focused on crafting refreshing,
                        high-quality drinks that bring people together. Our goal is to
                        deliver great taste with consistent quality in every bottle.
                    </p>
                </div>

                <div className="about-card">
                    <h3>Our Story</h3>
                    <p className="para">
                        Founded with a passion for flavor and innovation, our journey
                        started with a simple idea — to create drinks people love and
                        trust. From a small beginning, we continue to grow with the
                        support of our customers.
                    </p>
                </div>

                <div className="about-card">
                    <h3>Our Mission</h3>
                    <p className="para">
                        To create refreshing beverages using quality ingredients while
                        maintaining affordability, consistency, and customer satisfaction
                        across every product we deliver.
                    </p>
                </div>

                <div className="about-card">
                    <h3>Our Vision</h3>
                    <p className="para">
                        To become a trusted and recognizable drinks brand, known for
                        innovation, taste, and responsible production while expanding our
                        reach to new markets.
                    </p>
                </div>

                <div className="about-card">
                    <h3>Quality & Ingredients</h3>
                    <p className="para">
                        We use carefully selected ingredients and follow strict quality
                        standards to ensure freshness, safety, and great taste in every sip.
                    </p>
                </div>

                <div className="about-card">
                    <h3>Sustainability & Responsibility</h3>
                    <p className="para">
                        We are committed to responsible sourcing, eco-friendly packaging,
                        and reducing our environmental impact while supporting local
                        communities.
                    </p>
                </div>

            </div>
        </section>
    );
}
export default About;