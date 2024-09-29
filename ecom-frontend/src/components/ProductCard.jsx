// import React from 'react';

// const ProductCard = ({ product }) => {
//   return (
//     <div className="product-card">
//       <h3>{product.name}</h3>
//       <p>Price: ${product.price}</p>
//       <p>Category: {product.category}</p>
//       <img src={product.image} alt={product.name} width="100" height="100" />
//     </div>
//   );
// };

// export default ProductCard;

import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
    </div>
  );
};

export default ProductCard;
