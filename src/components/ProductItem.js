import React from 'react';
//import ShareButton from './ShareButton';
import '../styles/ProductItem.css';

const ProductItem = ({ product }) => {
  const handleClick = () => {
    window.location.href = `https://furrl.in/product/${product.id}`;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        url: `https://furrl.in/product/${product.id}`
      });
    } else {
      alert(`Copy this link to share: https://furrl.in/product/${product.id}`);
    }
  };

  return (
    <li className="product-item">
      <img src={product.images[0].src} alt={product.title} className="product-image" onClick={handleClick} />
      <div className="product-details">
        <h3>{product.title}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">
          <span className="mrp">{product.MRP.currency} {product.MRP.value}</span>
          <span className="price">{product.price.currency} {product.price.value}</span>
        </p>
        <p className="product-brand">{product.brand[0].name}</p>
        <div className="product-actions">
          <button onClick={handleClick} className="product-button">View Product</button>
          <button onClick={handleShare} className="product-button">Share</button>
        </div>
      </div>
    </li>
  );
};

export default ProductItem;
