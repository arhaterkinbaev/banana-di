import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getProductById, getComments, addComment } from '../services/api';

const ProductDetails = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category"); 
  const id = searchParams.get("id");

  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await new Promise(res => setTimeout(res, 1500));
        const productData = await getProductById(category, id);
        setProduct(productData);
        const commentsData = await getComments(id);
        setComments(commentsData);
      } catch (error) {
        console.error("Ошибка загрузки продукта:", error);
      } finally {
        setLoading(false);
      }
    };

    if (category && id) loadData();
  }, [category, id]);

  const handleAddComment = async () => {
    if (!inputValue.trim()) return;

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) {
      alert("Чтобы оставить комментарий, войдите в аккаунт!");
      return;
    }

    const newComment = {
      productId: id,
      author: user.name || user.email || "Пользователь",
      text: inputValue,
      date: new Date().toISOString()
    };

    try {
      const saved = await addComment(newComment);
      setComments(prev => [...prev, saved]);
      setInputValue("");
    } catch (error) {
      console.error("Ошибка добавления комментария:", error);
      alert("Ошибка при отправке комментария!");
    }
  };
  if (loading) {
    return (
      <div className="details-container">
        <div className="details-flex">
          <div className="left-side loading-skeleton-details">
            <div className="skeleton-image-details loading-skeleton"></div>
            <div className="skeleton-text-lg loading-skeleton" style={{ width: '80%' }}></div>
            <div className="skeleton-text-sm loading-skeleton" style={{ width: '30%' }}></div>
          </div>
          <div className="right-side loading-skeleton-details">
            <div className="skeleton-text-md loading-skeleton" style={{ width: '50%', marginBottom: '20px' }}></div>
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="comment skeleton-comment loading-skeleton">
                <div className="skeleton-text-sm loading-skeleton" style={{ width: '20%' }}></div>
                <div className="skeleton-text-full loading-skeleton"></div>
              </div>
            ))}
            <div className="skeleton-textarea loading-skeleton"></div>
            <div className="skeleton-button-sm loading-skeleton" style={{ marginTop: '10px' }}></div>
          </div>
        </div>
      </div>
    );
  }
  if (!product) {
    return (
      <div className="details-container">
        <p className="no-product-found">Продукт не найден.</p>
      </div>
    );
  }

  return (
    <div className="details-container">
      <div className="details-flex">
        <div className="left-side">
          <img className="details-img" src={product.imageUrl} alt={product.name} />
          <h2>{product.name}</h2>
          <p className="details-price">{product.price.toLocaleString()} ₸</p>
        </div>

        <div className="right-side">
          <h3>Комментарии</h3>

          <div className="comments-list">
            {comments.length === 0 ? (
              <p className='no-comments-message'>Комментариев пока нет. Будьте первым!</p>
            ) : (
              comments.map(c => (
                <div key={c.id || c.date} className="comment">
                  <strong>{c.author}</strong>
                  <p>{c.text}</p>
                </div>
              ))
            )}
          </div>

          <textarea
            className="comment-input"
            placeholder="Ваш комментарий..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <button 
            onClick={handleAddComment}
            className="send-comment"
            disabled={!inputValue.trim()}
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
