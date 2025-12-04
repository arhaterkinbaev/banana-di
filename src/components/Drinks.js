import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { getProducts } from '../services/api';
import { Link } from 'react-router-dom';

const Drinks = ({ searchQuery }) => {
  const { addToCart } = useCart();
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));

        const drinksData = await getProducts("drinks", searchQuery);

        const updated = drinksData.map(item => ({
          ...item,
          category: "drinks",
        }));

        setDrinks(updated);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDrinks();
  }, [searchQuery]);

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    addToCart(product);
    alert(`${product.name} добавлен в корзину!`);
  };

  const filteredDrinks = drinks.filter(product =>
    (product.name || "").toLowerCase().startsWith((searchQuery || "").toLowerCase())
  );

  const renderSkeletons = () => {
    return Array(8).fill(0).map((_, index) => (
      <div key={index} className="drink-card loading-skeleton">
        <div className="card-content">
          <div className="skeleton-image loading-skeleton"></div>

          <div className="drink-info">
            <div className="skeleton-text loading-skeleton"></div>
            <div className="skeleton-text-small loading-skeleton"></div>
          </div>

          <div className="skeleton-button loading-skeleton" style={{ marginBottom: '8px' }}></div>
          <div className="skeleton-button loading-skeleton"></div>
        </div>
      </div>
    ));
  };

  return (
    <section className="drinks-section">
      <h2 className="drinks-title">Напитки</h2>

      <div className="drinks-grid">
        {loading ? (
          renderSkeletons()
        ) : filteredDrinks.length === 0 ? (
          <p className="no-results">Ничего не найдено</p>
        ) : (
          filteredDrinks.map((product) => (
            <Link
              key={product.id}
              to={`/product?category=${product.category}&id=${product.id}`}
              className="drink-card"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="card-content">
                <div className="product-image">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="product-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="drink-image" style={{ display: 'none' }}></div>
                </div>

                <div className="drink-info">
                  <p className="drink-name">{product.name}</p>
                  <p className="drink-price">{product.price.toLocaleString()} ₸</p>
                </div>

                <button
                  className="add-to-cart"
                  onClick={(e) => handleAddToCart(product, e)}
                >
                  В корзину
                </button>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
};

export default Drinks;
