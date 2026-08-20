import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import fallbackProducts from "../../data/products";
import { API_BASE_URL } from "../../config/api";

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

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialProduct = fallbackProducts.find(
    (p) => String(p._id || p.id) === String(id)
  ) || null;

  const [product, setProduct] = useState(initialProduct);
  const [loading, setLoading] = useState(!initialProduct);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
        const result = await response.json();

        if (isMounted) {
          if (response.ok && result.success && result.data) {
            setProduct(result.data);
            setError("");
          } else if (!product) {
            const found = fallbackProducts.find(
              (p) => String(p._id || p.id) === String(id)
            ) || null;
            if (found) {
              setProduct(found);
            } else {
              setError(result.message || "Product not found");
            }
          }
        }
      } catch (err) {
        console.warn("Product API fetch error:", err);
        if (isMounted && !product) {
          const found = fallbackProducts.find(
            (p) => String(p._id || p.id) === String(id)
          ) || null;
          if (found) {
            setProduct(found);
          } else {
            setError("Unable to load product details");
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to delete product");
      }

      navigate("/products");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <main className="products-page">
        <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
          <p style={{ color: "#64748b", fontSize: "1.1rem" }}>Loading product details...</p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="products-page">
        <h1>Product not found</h1>
        <p>{error || "The requested product could not be found."}</p>
        <Link to="/products" className="primary-btn">
          Back to Products
        </Link>
      </main>
    );
  }

  const defaultImage = getDefaultImage(product.name);
  const image = resolveProductImage(product.image, product.name);
  const productId = product._id || product.id || id;

  return (
    <main className="products-page">
      <Link to="/products" className="back-link">
        ← Back to Products
      </Link>

      <section className="product-detail">
        <div className="product-detail-image">
          <img
            src={image}
            alt={product.name || "Product image"}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = defaultImage;
            }}
          />
        </div>

        <div className="product-detail-content">
          <span className="product-category">
            {product.category || "General"}
          </span>

          <h1>{product.name}</h1>

          <p>{product.description}</p>

          <h2>
            ₹{Number(product.price || 0).toLocaleString("en-IN")}
          </h2>

          <p>
            {product.stock > 0
              ? `${product.stock} units available`
              : "Out of stock"}
          </p>

          <div className="product-actions">
            {token && (
              <>
                <Link
                  to={`/products/${productId}/edit`}
                  className="primary-btn"
                >
                  Edit Product
                </Link>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="danger-btn"
                >
                  Delete Product
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
