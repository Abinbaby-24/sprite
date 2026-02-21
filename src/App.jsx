import './App.css'

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import About from "./components/About";
import Cart from "./components/Cart";
import Services from "./components/Services";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Cart />
      <Products />
      <About />
      <Services />
      <Footer />
    </>
  );
}

export default App;


