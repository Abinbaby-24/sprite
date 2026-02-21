import './App.css'

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import About from "./components/About";
import Cart from "./components/Cart";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Cart />
      <Products />
      <About />
    </>
  );
}

export default App;


