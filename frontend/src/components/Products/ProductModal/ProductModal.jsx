import React from 'react';
import s from './ProductModal.module.css';
import productImage from "../../../assets/product.jpg"

function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className={s.modalOverlay}>
      <div className={s.modal}>
        <button onClick={onClose} className={s.closeButton}>×</button>
        <img src={product.imageUrl || productImage} alt={product.name} className={s.productImage} />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>Price: {product.price}$</p>
      </div>
    </div>
  );
}

export default ProductModal;
