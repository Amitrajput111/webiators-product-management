import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../config/api";

const productImages = [
  { name: "Headphones", value: "/images/products/headphones.jpg" },
  { name: "Keyboard", value: "/images/products/keyboard.jpg" },
  { name: "Smart Watch", value: "/images/products/smartwatch.jpg" },
  { name: "Wireless Mouse", value: "/images/products/mouse.jpg" },
  { name: "4K Monitor", value: "/images/products/monitor.jpg" },
];

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/products/${id}`
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to load product");
        }

        const product = result.data;

        setForm({
          name: product.name || "",
          description: product.description || "",
          price: product.price ?? "",
          category: product.category || "",
          image: product.image || "",
          stock: product.stock ?? "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const selectImage = (image) => {
    setForm((previous) => ({
      ...previous,
      image,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((previous) => ({
          ...previous,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSaving(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const imageUrl = form.image ? form.image.trim() : "";

      const response = await fetch(
        `${API_BASE_URL}/api/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: form.name.trim(),
            description: form.description.trim(),
            price: Number(form.price),
            category: form.category.trim(),
            image: imageUrl,
            stock: Number(form.stock),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update product");
      }

      navigate(`/products/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="products-page">
        <p>Loading product...</p>
      </main>
    );
  }

  return (
    <main className="products-page">
      <div className="products-header">
        <div>
          <p className="eyebrow">ProductHub</p>
          <h1>Edit Product</h1>
          <p>Update your product information.</p>
        </div>

        <Link to={`/products/${id}`} className="secondary-btn">
          Back to Product
        </Link>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price (₹)</label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="any"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            type="text"
            value={form.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group product-image-selector">
          <label htmlFor="image">Product Image</label>

          {form.image && (
            <div className="selected-image-preview">
              <img
                src={form.image}
                alt="Product preview"
                onError={(e) => {
                  e.target.src = "/images/products/headphones.jpg";
                }}
              />
            </div>
          )}

          <div className="file-upload-wrapper" style={{ margin: "14px 0" }}>
            <label
              htmlFor="file-upload-edit"
              className="secondary-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                padding: "10px 16px",
                fontWeight: "600"
              }}
            >
              📷 Upload Image from Computer File System
            </label>
            <input
              id="file-upload-edit"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </div>

          <input
            id="image"
            name="image"
            type="text"
            value={form.image}
            onChange={handleChange}
            placeholder="Or enter custom image URL"
            style={{ marginBottom: "12px" }}
          />

          <p style={{ fontSize: "13px", color: "#64748b", margin: "8px 0" }}>
            Or select a preset product image:
          </p>

          <div className="image-options">
            {productImages.map((img) => (
              <button
                type="button"
                key={img.value}
                className={`image-option ${
                  form.image === img.value ? "selected" : ""
                }`}
                onClick={() => selectImage(img.value)}
              >
                <img src={img.value} alt={img.name} />
                <span>{img.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            value={form.stock}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="primary-btn"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            className="secondary-btn"
            onClick={() => navigate(`/products/${id}`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}

export default ProductEdit;
