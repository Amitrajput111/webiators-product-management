const ProductCard = ({ product }) => {
  const name = product?.name?.toLowerCase() || "";

  const defaultImage = name.includes("headphone")
    ? "/images/products/headphones.jpg"
    : "/images/products/keyboard.jpg";

  const image =
    product?.image && product.image.trim() !== ""
      ? product.image
          .replace("/images/Products/", "/images/products/")
          .replace(
            "/images/products/headphone.jpg",
            "/images/products/headphones.jpg"
          )
      : defaultImage;

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <img
          src={image}
          alt={product.name}
          className="product-image"
          onError={(e) => {
            if (e.target.src !== defaultImage) {
              e.target.src = defaultImage;
            }
          }}
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
