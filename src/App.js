import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import ShopPage from './pages/ShopPage/ShopPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import ProductPage from './pages/ProductPage/ProductPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import ProductModal from './components/products/ProductModal/ProductModal';
import CartDrawer from './components/cart/CartDrawer/CartDrawer';
import AboutPage from './pages/AboutPage/AboutPage';

import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} /> 
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={
            <div className="container-custom py-20 text-center">
              <h1 className="font-serif text-4xl text-soft-black mb-4">Page Not Found</h1>
              <p className="text-warm-gray">This page doesn't exist yet.</p>
            </div>
          } />
        </Routes>
      </Layout>
      
      <ProductModal />
      <CartDrawer />
    </Router>
  );
}

export default App;