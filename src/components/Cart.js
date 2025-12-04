import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice 
  } = useCart();

  const handleQuantityChange = (productId, change) => {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
      updateQuantity(productId, item.quantity + change);
    }
  };

  if (cartItems.length === 0) {
    return (
      <section className="cart-section">
        <h2 className="cart-title">Корзина</h2>
        <div className="empty-cart">
          <p>Корзина пуста</p>
          <p>Добавьте товары из меню</p>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-section">
      <h2 className="cart-title">Корзина</h2>

      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image"></div>
              
              <div className="cart-item-info">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">{item.price.toLocaleString()} ₸</p>
              </div>

              <div className="cart-item-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item.id, -1)}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item.id, 1)}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                {(item.price * item.quantity).toLocaleString()} ₸
              </div>

              <button 
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-total">
            <span>Итого:</span>
            <span className="total-price">{getTotalPrice().toLocaleString()} ₸</span>
          </div>
          <button className="checkout-btn">Оформить заказ</button>
        </div>
      </div>
    </section>
  );
};

export default Cart;