import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/products"
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
          <p>Manage your product inventory ({filteredProducts.length} items).</p>
        </div>

        <Link to="/products/new" className="primary-btn">
          + Add Product
        </Link>
      </div>

      <div
        className="filter-controls"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "28px",
          alignItems: "center",
          justify: "space-between",
          background: "white",
          padding: "16px 20px",
          borderRadius: "14px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 2px 10px rgba(0,0,0,0.03)"
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search products by name, category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "10px 16px",
            borderRadius: "10px",
            border: "1px solid #cbd5e1",
            maxWidth: "320px",
            width: "100%",
            fontSize: "14px",
            outline: "none"
          }}
        />

        <div
          className="category-pills"
          style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "8px 14px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "13px",
                background: selectedCategory === cat ? "#2563eb" : "#f1f5f9",
                color: selectedCategory === cat ? "#ffffff" : "#475569",
                transition: "all 0.2s ease"
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <h2>No products found</h2>
          <p>Try adjusting your search or category filter.</p>
          <Link to="/products/new" className="primary-btn">
            Create Product
          </Link>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => {
            const defaultImage = getDefaultImage(product.name);
            const image = resolveProductImage(product.image, product.name);

            return (
              <article className="product-card" key={product._id}>
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
