import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductListPage from './pages/StorePage/StorePage';
import CartPage from './pages/CartPage/CartPage';
import Navbar from './components/Navbar/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
      </div>
      <div className="app">
        <div className="app-container">
          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
