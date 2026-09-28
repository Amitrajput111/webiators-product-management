import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import fallbackProducts from "../../data/products";
import { API_BASE_URL } from "../../config/api";
import { getCachedProduct, setCachedProduct } from "../../utils/productCache";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const initialProduct =
    location.state?.product ||
    getCachedProduct(id) ||
    fallbackProducts.find((p) => String(p._id || p.id) === String(id)) ||
    null;

  const [product, setProduct] = useState(initialProduct);
  const [loading, setLoading] = useState(!initialProduct);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    let isMounted = true;

    if (location.state?.product) {
      setProduct(location.state.product);
      setCachedProduct(location.state.product);
      setLoading(false);
    }

    const fetchProduct = async () => {
      if (!id) return;
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
        const result = await response.json();

        if (isMounted) {
          if (response.ok && result.success && result.data) {
            setProduct(result.data);
            setCachedProduct(result.data);
          } else if (!product) {
            const fallback = fallbackProducts.find((p) => String(p._id || p.id) === String(id));
            if (fallback) setProduct(fallback);
            else setError("Product not found");
          }
        }
      } catch (err) {
        if (isMounted && !product) {
          const fallback = fallbackProducts.find((p) => String(p._id || p.id) === String(id));
          if (fallback) setProduct(fallback);
          else setError("Unable to load product details");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProduct();
    return () => { isMounted = false; };
  }, [id, location.state, product]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Unable to delete product");
      navigate("/products");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "100px 24px", color: '#B8935C', letterSpacing: '2px', textTransform: 'uppercase' }}>
        Retrieving Details...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ textAlign: "center", padding: "100px 24px" }}>
        <h2>Item not found</h2>
        <Link to="/products" className="view-btn">Return to Collection</Link>
      </div>
    );
  }

  const productId = product?._id || product?.id || id;
  const inStock = Number(product?.stock || 0) > 0;

  return (
    <main className="container" style={{ padding: '60px 24px' }}>
      <Link to="/products" className="back-link">
        ← Back to Collection
      </Link>

      <section className="product-detail">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-detail-content">
          <span className="product-category">{product.category}</span>
          <h1>{product.name}</h1>
          <h2>₹{Number(product.price).toLocaleString("en-IN")}</h2>
          
          <div className={`stock-status ${inStock ? 'in' : 'out'}`}>
            {inStock ? 'Available Online' : 'Currently Unavailable'}
          </div>

          <p className="desc">{product.description}</p>
          
          <div style={{ borderTop: '1px solid #E8E6E1', borderBottom: '1px solid #E8E6E1', padding: '24px 0', marginBottom: '40px' }}>
            <div style={{ display: 'flex', gap: '16px', color: '#555555', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <span>✓ Complimentary Shipping</span>
              <span>✓ Complimentary Returns</span>
            </div>
          </div>

          <button className="primary-btn action-btn" disabled={!inStock}>
            {inStock ? 'Add to Shopping Bag' : 'Out of Stock'}
          </button>

          {token && (
            <div className="product-actions">
              <Link to={`/products/${productId}/edit`} className="secondary-btn" style={{ flex: 1 }}>
                Edit Product
              </Link>
              <button type="button" onClick={handleDelete} className="danger-btn" style={{ flex: 1 }}>
                Delete
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
