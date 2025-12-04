import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import ProductDetails from "./components/ProductDetails";
import Drinks from './components/Drinks';
import Burgers from './components/Burgers';
import Combo from './components/Combo';
import Cart from './components/Cart';
import Footer from './components/Footer';
import { Routes, Route, useLocation } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";   
import Register from "./components/Register";       
import Login from "./components/Login";             

import './App.css';
import { AuthProvider } from './context/AuthContext';
const PageWrapper = ({ children, activeSection, setActiveSection, searchQuery, setSearchQuery }) => (
  <>
    <Header 
      onSectionChange={setActiveSection}
      activeSection={activeSection}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
    <main>{children}</main>
    <Footer />
  </>
);

function AppContent() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('');
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log("Page changed:", location.pathname + location.search);
  }, [location]);

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route
          path="/"
          element={
            <PageWrapper
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            >
              {
                activeSection === 'burgers'
                  ? <Burgers searchQuery={searchQuery} />
                  : activeSection === 'combo'
                  ? <Combo searchQuery={searchQuery} />
                  : activeSection === 'cart'
                  ? <Cart />
                  : <Drinks searchQuery={searchQuery} />
              }
            </PageWrapper>
          }
        />
        <Route
          path="/product"
          element={
            <PageWrapper
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            >
              <ProductDetails />
            </PageWrapper>
          }
        />

      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
    <CartProvider>
      <div className="App">
        <AppContent />
      </div>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;
