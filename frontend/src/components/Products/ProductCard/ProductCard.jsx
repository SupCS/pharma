import { useState } from 'react';
import s from './ProductCard.module.css';
import productImage from "../../../assets/product.jpg";
import heartIcon from "../../../assets/heart.svg";
import heartIconRed from "../../../assets/heartRed.svg";
import cartIcon from "../../../assets/cart.svg";
import Notification from '../../../utils/Notification';

function ProductCard({ product, onClick, onAddToCart, pharmacy, isFavorite, toggleFavorite }) {
  const [showNotification, setShowNotification] = useState(false);
  const handleAddToCartClick = (e, product) => {
    e.stopPropagation();
    setShowNotification(true);
    onAddToCart(product, pharmacy);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleToggleFavoriteClick = (e, product) => {
    e.stopPropagation();
    toggleFavorite(product._id);
  };



  return (
    <div className={s.card} onClick={() => onClick(product)}>
      <Notification message="Product added to cart!" show={showNotification} onClose={() => setShowNotification(false)} />
      <img src={product.imageUrl || productImage} alt={product.name} className={s.cardImage} />
      <h4 className={s.cardTitle}>{product.name}</h4>
      <p className={s.cardDescription}>{product.description.length > 100 ? `${product.description.slice(0, 100)}...` : product.description}</p>
      <p className={s.cardPrice}>Price: {product.price}$</p>
      <div className={s.actions}>
        <button onClick={(e) => handleAddToCartClick(e, product)} className={s.actionButton}>
          <img src={cartIcon} alt="Add to cart" className={s.icon} />
        </button>
        <button onClick={(e) => handleToggleFavoriteClick(e, product)} className={s.actionButton}>
          <img src={isFavorite ? heartIconRed : heartIcon} alt={isFavorite ? "Remove from favorite" : "Add to favorite"} className={s.icon} />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
