import "./Hero.css";
import can from "../assets/sprite-can.png";
import apple from "../assets/apple.png";
import leaf from "../assets/leaf.png";


function Hero() {
    return (
        <div className="hero">
            <h1 className="title">GREEN APPLE</h1>

            <img src={can} className="can" alt="can" />


            <img src={apple} className="apple appleLeft" />
            <img src={apple} className="apple appleRight" />
            <img src={apple} className="apple appleRight2" />
            <img src={apple} className="apple appleLeft2" />
            <img src={apple} className="apple appleRight3" />


            <img src={leaf} className="leaf leaf1" />
            <img src={leaf} className="leaf leaf2" />
            <img src={leaf} className="leaf leaf3" />


            <div className="buttons">
                <button className="btn">ADD TO CART</button>
                <button className="btn">SERVICES</button>
            </div>
        </div>

    );
}

export default Hero;
