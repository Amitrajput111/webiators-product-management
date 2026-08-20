import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/products"
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch products");
      }

      setProducts(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <main className="products-page">
        <h1>Products</h1>
        <p>Loading products...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="products-page">
        <h1>Products</h1>
        <p>Unable to load products: {error}</p>
        <button onClick={fetchProducts}>Retry</button>
      </main>
    );
  }

  return (
    <main className="products-page">
      <div className="products-header">
        <div>
          <p className="eyebrow">ProductHub</p>
          <h1>Products</h1>
          <p>Manage your product inventory.</p>
        </div>

        <Link to="/products/new" className="primary-btn">
          + Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <h2>No products found</h2>
          <p>Create your first product.</p>
          <Link to="/products/new" className="primary-btn">
            Create Product
          </Link>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => {
            const name = product.name?.toLowerCase() || "";
            const defaultImage = name.includes("headphone")
              ? "/images/products/headphones.jpg"
              : "/images/products/keyboard.jpg";

            const image =
              product.image && product.image.trim() !== ""
                ? product.image
                    .replace("/images/Products/", "/images/products/")
                    .replace(
                      "/images/products/headphone.jpg",
                      "/images/products/headphones.jpg"
                    )
                : defaultImage;

            return (
              <article className="product-card" key={product._id}>
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

                    <Link
                      to={`/products/${product._id}`}
                      className="view-btn"
                    >
                      View product →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default ProductList;
