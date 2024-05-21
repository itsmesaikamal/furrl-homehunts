import React, { useState, useEffect, useCallback } from 'react';
import '../styles/ProductList.css'; // Ensure the CSS filename matches
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';

function ListingProducts() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetch('https://api.furrl.in/api/v2/listing/getListingProducts', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Appversion': '1.0.234+145',
          'Deviceid': process.env.REACT_APP_DEVICE_ID, // Replace with environment variable
          'Origin': 'https://web.furrl.in',
          'Referer': 'https://web.furrl.in/',
          'Sec-Ch-Ua': '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
          'Sec-Ch-Ua-Mobile': '?1',
          'Sec-Ch-Ua-Platform': '"Android"',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
          'Visitid': process.env.REACT_APP_VISIT_ID // Replace with environment variable
        },
        body: JSON.stringify({
          input: {
            page,
            pageSize: 10,
            filters: [],
            id: '#HomeHunts',
            entity: 'vibe'
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      const newProducts = responseData.data.getListingProducts.products;

      setProducts(prevProducts => [...prevProducts, ...newProducts]);
      setHasMore(newProducts.length > 0);
    } catch (error) {
      console.error('Error fetching listing products:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight || loading) return;
      setPage(prevPage => prevPage + 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  const handleShare = (product) => {
    navigator.share({ 
      title: product.title, 
      url: `/product/${product.id}`
    });
  };

  return (
    <div>
      <img src="https://watermark.lovepik.com/photo/40008/0007.jpg_wh1200.jpg" alt="Furrl Home Page" className="homepage-image" />
      <h1 className="sideheading">Shop Products</h1>
      <div className="filter-buttons">
        <button className="filter-button">All</button>
        <button className="filter-button">Home</button>
        <button className="filter-button">Apparel</button>
        <button className="filter-button">Accessories</button>
      </div>
      <ul className="product-list">
        {products.map(product => {
          const productUrl = `https://web.furrl.in/productDetail?id=${product.brand[0].id}&ref=vibeResults_HomeHunts`;
          console.log(productUrl); // Log the dynamic URL

          return (
            <li key={product.id} className="product-item">
              <a href={`https://web.furrl.in/productDetail?id=${product.id}&ref=vibeResults_HomeHunts`} rel="noopener noreferrer">
              <img src={product.images[0].src} alt={product.title} className="product-image" />
            </a>
              <FontAwesomeIcon 
                icon={faShareAlt} 
                className="share-icon" 
                onClick={() => handleShare(product)} 
              />
              <div className="product-details">
                <p className="product-brand">{product.brand[0].name}</p>
                <h3>{product.title}</h3>
                <p className="product-price">
                  <span className="mrp">{product.MRP.currency} {product.MRP.value}</span>
                  <span className="price">{product.price.currency} {product.price.value}</span>
                </p>
                
              </div>
            </li>
          );
        })}
      </ul>
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default ListingProducts;
