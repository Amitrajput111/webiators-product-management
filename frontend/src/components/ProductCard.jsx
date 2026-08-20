const ProductCard = ({ product }) => {
  const name = product.name?.toLowerCase() || "";

  const image = name.includes("headphone")
    ? "/images/Products/headphones.jpg"
    : "/images/Products/keyboard.jpg";

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <img
          src={image}
          alt={product.name}
          className="product-image"
        />

        <span className="stock-badge">
          {product.stock > 0
            ? `${product.stock} in stock`
            : "Out of stock"}
        </span>
      </div>

      <div className="product-content">
        <span className="product-category">
          {product.category}
        </span>

        <h2>{product.name}</h2>

        <p>{product.description}</p>

        <div className="product-footer">
          <strong>
            ₹{Number(product.price).toLocaleString("en-IN")}
          </strong>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
