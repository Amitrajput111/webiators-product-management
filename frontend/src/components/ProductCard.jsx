const ProductCard = ({ product }) => {
  return (
    <article className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-card__image"
      />

      <div className="product-card__content">
        <p>{product.category}</p>

        <h3>{product.name}</h3>

        <p>{product.description}</p>

        <strong>
          ?{product.price.toLocaleString("en-IN")}
        </strong>

        <span>
          {product.stock > 0
            ? `${product.stock} in stock`
            : "Out of stock"}
        </span>
      </div>
    </article>
  );
};

export default ProductCard;
