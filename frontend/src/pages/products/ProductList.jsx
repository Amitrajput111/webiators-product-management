import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import fallbackProducts from "../../data/products";
import { API_BASE_URL } from "../../config/api";
import { getCachedProductList, setCachedProductList } from "../../utils/productCache";

const ProductList = () => {
  const [products, setProducts] = useState(() => getCachedProductList());
  const [loading, setLoading] = useState(() => getCachedProductList().length === 0);
  const [error, setError] = useState("");
  
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const categories = ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];

  useEffect(() => {
    const categoryQuery = searchParams.get("category");
    if (categoryQuery) {
      setSelectedCategory(categoryQuery);
    }
  }, [searchParams]);

  const filteredProducts = products.filter((product) => {
    return selectedCategory === "All" || product.category === selectedCategory;
  });

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products?limit=100`);
      const result = await response.json();

      if (response.ok && result.success && Array.isArray(result.data) && result.data.length > 0) {
        setCachedProductList(result.data);
        setProducts(result.data);
      } else {
        setCachedProductList(fallbackProducts);
        setProducts(fallbackProducts);
      }
    } catch (err) {
      console.warn("API offline or empty, utilizing fallback catalog:", err);
      setCachedProductList(fallbackProducts);
      setProducts(fallbackProducts);
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
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <p style={{ letterSpacing: '2px', textTransform: 'uppercase', color: '#B8935C' }}>Curating Collection...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="products-page">
      <div className="products-header">
        <div>
          <h1>The Collection</h1>
          <p>Discover our meticulously curated selection of luxury goods.</p>
        </div>
      </div>

      <div className="filter-controls">
        <div className="category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={selectedCategory === cat ? "active" : ""}
              onClick={() => {
                setSelectedCategory(cat);
                setSearchParams(cat === "All" ? {} : { category: cat });
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <h2>No pieces found</h2>
          <p>We could not find any items matching your criteria.</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <Link to={`/products/${product._id || product.id}`} className="product-card" key={product._id || product.id}>
              <div className="product-image-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                {product.stock <= 0 && (
                  <span className="stock-badge">Sold Out</span>
                )}
              </div>

              <div className="product-content">
                <span className="product-category">{product.category}</span>
                <h2>{product.name}</h2>
                <div className="product-footer">
                  <strong>₹{Number(product.price).toLocaleString("en-IN")}</strong>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};

export default ProductList;
