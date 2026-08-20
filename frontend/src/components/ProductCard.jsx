const getDefaultImage = (name) => {
  const n = (name || "").toLowerCase();
  if (n.includes("watch") || n.includes("smart")) return "/images/products/smartwatch.jpg";
  if (n.includes("mouse")) return "/images/products/mouse.jpg";
  if (n.includes("monitor") || n.includes("display") || n.includes("screen")) return "/images/products/monitor.jpg";
  if (n.includes("headphone")) return "/images/products/headphones.jpg";
  return "/images/products/keyboard.jpg";
};

const resolveProductImage = (img, name) => {
  const defaultImage = getDefaultImage(name);
  if (!img || typeof img !== "string" || img.trim() === "") {
    return defaultImage;
  }
  let cleanImg = img.trim();
  cleanImg = cleanImg.replace(/^https?:\/\/localhost(:\d+)?/, "");
  cleanImg = cleanImg
    .replace("/images/Products/", "/images/products/")
    .replace(
      "/images/products/headphone.jpg",
      "/images/products/headphones.jpg"
    );
  return cleanImg || defaultImage;
};

const ProductCard = ({ product }) => {
  const defaultImage = getDefaultImage(product?.name);
  const image = resolveProductImage(product?.image, product?.name);

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <img
          src={image}
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = defaultImage;
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
