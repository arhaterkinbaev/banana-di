import React from 'react';
import { useNavigate } from "react-router-dom";

const Header = ({ onSectionChange, activeSection, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();

  const navigationItems = [
    { label: "Выйти", key: "logout" },
    { label: "Бургеры", key: "burgers" },
    { label: "Напитки", key: "drinks" },
    { label: "Комбо", key: "combo" },
    { label: "Корзина", key: "cart" },
  ];

  const handleSectionClick = (key) => {
    if (key === "logout") {
      localStorage.removeItem("token");
      navigate("/login");
      return;
    }

    if (onSectionChange) onSectionChange(key);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <a href="/" className="logo-link">
          <h1 className="logo">БАНАНДИ</h1>
        </a>
      </div>

      <div className="header-search">
        <input 
          type="text"
          className="search-input"
          placeholder="Поиск..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <nav className="nav">
        {navigationItems.map((item, index) => {
          let buttonClass = item.key === "cart" ? "nav-button" : "nav-link";
          
          if (item.key === activeSection) {
            buttonClass += ' active';
          }

          return (
            <button 
              key={index} 
              className={buttonClass}
              onClick={() => handleSectionClick(item.key)}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
