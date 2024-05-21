// src/components/ShareButton.js
import React from 'react';
import '../styles/ShareButton.css';

const ShareButton = ({ productUrl }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this product!',
        url: productUrl
      });
    } else {
      alert(`Copy this link to share: ${productUrl}`);
    }
  };

  return (
    <button className="share-button" onClick={handleShare}>🔗 Share</button>
  );
};

export default ShareButton;
