import { BrowserRouter, Route, Routes } from "react-router-dom";

import Products from "./pages/products"; // Ensure the file path is correct
import './App.css'; // Ensure this file exists and is correctly linked
import Product from "./pages/products";
import Header from "./components/HeaderComponent";
import Contact from "./components/Contacttheme";

function App() {
  return (
    <>
    <Header />
    <Product />
    
       </>
  );
}

export default App;
