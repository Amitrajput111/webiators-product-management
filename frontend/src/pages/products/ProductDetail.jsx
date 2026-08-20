import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const getDefaultImage = (name) => {
  const n = (name || "").toLowerCase();
  if (n.includes("watch") || n.includes("smart")) return "/images/products/smartwatch.jpg";
  if (n.includes("mouse")) return "/images/products/mouse.jpg";
  if (n.includes("monitor") || n.includes("display") || n.includes("screen")) return "/images/products/monitor.jpg";
  if (n.includes("headphone")) return "/images/products/headphones.jpg";
  return "/images/products/keyboard.jpg";
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `/api/products/${id}`
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Product not found");
        }

        setProduct(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/products/${id}`,
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
        <p>Loading product...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="products-page">
        <h1>Product not found</h1>
        <p>{error}</p>
        <Link to="/products" className="primary-btn">
          Back to Products
        </Link>
      </main>
    );
  }

  const defaultImage = getDefaultImage(product?.name);

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
    <main className="products-page">
      <Link to="/products" className="back-link">
        ← Back to Products
      </Link>

      <section className="product-detail">
        <div className="product-detail-image">
          <img
            src={image}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = defaultImage;
            }}
          />
        </div>

        <div className="product-detail-content">
          <span className="product-category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <p>{product.description}</p>

          <h2>
            ₹{Number(product.price).toLocaleString("en-IN")}
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
                  to={`/products/${product._id}/edit`}
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
