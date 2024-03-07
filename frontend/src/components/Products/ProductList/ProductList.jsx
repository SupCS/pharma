import React, { useState } from 'react';
import s from './ProductList.module.css';
import ProductCard from '../ProductCard/ProductCard';
import ProductModal from '../ProductModal/ProductModal';
import { useSortedProducts } from '../../../hooks/useSortedProducts';

function ProductList({ pharmacy }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [sortType, setSortType] = useState('newest');

  const sortedProducts = useSortedProducts(pharmacy?.products || [], favorites, sortType);

  const toggleFavorite = (productId) => {
    setFavorites((prevFavorites) => {
      const newFavorites =prevFavorites.includes(productId)
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId]

    localStorage.setItem('favorites', JSON.stringify(newFavorites));

    return newFavorites;
    })
  };  

  const handleClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product, pharmacy) => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const productWithPharmacy = { ...product, pharmacyId: pharmacy._id, pharmacyName: pharmacy.name };
    
    const existingProductIndex = currentCart.findIndex(item => item._id === product._id);
  
    if (existingProductIndex >= 0) {
      currentCart[existingProductIndex].quantity += 1;
    } else {
      const newProduct = { ...productWithPharmacy, quantity: 1 };
      currentCart.push(newProduct);
    }

    localStorage.setItem('cart', JSON.stringify(currentCart));
  };
  

  return (
    <div className={s.productListWrapper}>
      <div className={s.sortButtonsContainer}>
        <button className={`${s.sortButton} ${sortType === 'newest' ? s.active : ''}`} onClick={() => setSortType('newest')}>Newest first</button>
        <button className={`${s.sortButton} ${sortType === 'oldest' ? s.active : ''}`} onClick={() => setSortType('oldest')}>Oldest first</button>
        <button className={`${s.sortButton} ${sortType === 'cheapest' ? s.active : ''}`} onClick={() => setSortType('cheapest')}>Price ascending</button>
        <button className={`${s.sortButton} ${sortType === 'mostExpensive' ? s.active : ''}`} onClick={() => setSortType('mostExpensive')}>Price descending</button>
      </div>
      <div className={s.productList}>
        {sortedProducts.length === 0 ? <p>It's empty here now.</p> : (
          sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={handleClick}
              onAddToCart={handleAddToCart}
              toggleFavorite={toggleFavorite}
              isFavorite={favorites.includes(product._id)}
              pharmacy={pharmacy}
            />
          ))
        )}
      </div>
      <ProductModal product={selectedProduct} onClose={handleCloseModal} />
    </div>
  );
}

export default ProductList;
