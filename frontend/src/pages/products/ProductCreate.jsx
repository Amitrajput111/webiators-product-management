import { useState } from "react";
import { useNavigate } from "react-router-dom";

const productImages = [
  {
    name: "Headphones",
    value: "/images/products/headphones.jpg",
  },
  {
    name: "Keyboard",
    value: "/images/products/keyboard.jpg",
  },
  {
    name: "Smart Watch",
    value: "/images/products/smartwatch.jpg",
  },
  {
    name: "Wireless Mouse",
    value: "/images/products/mouse.jpg",
  },
  {
    name: "4K Monitor",
    value: "/images/products/monitor.jpg",
  },
];

function ProductCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "/images/products/headphones.jpg",
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const selectImage = (image) => {
    setForm((current) => ({
      ...current,
      image,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((current) => ({
          ...current,
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
        "/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: form.name.trim(),
            description: form.description.trim(),
            price: Number(form.price),
            category: form.category.trim(),
            stock: Number(form.stock),
            image: imageUrl,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to create product"
        );
      }

      navigate("/products");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="products-page">
      <div className="products-header">
        <div>
          <p className="eyebrow">ProductHub</p>
          <h1>Add Product</h1>
          <p>Create a new product in your inventory.</p>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="product-form"
      >
        <div className="form-group">
          <label htmlFor="name">Product Name</label>

          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Wireless Headphones"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Product description"
            minLength={5}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>

          <input
            id="price"
            name="price"
            type="number"
            min="1"
            value={form.price}
            onChange={handleChange}
            placeholder="2999"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>

          <input
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Electronics"
            required
          />
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
            placeholder="20"
            required
          />
        </div>

        <div className="form-group product-image-selector">
          <label>Product Image</label>

          <div className="selected-image-preview">
            <img
              src={form.image}
              alt="Selected product preview"
              onError={(e) => {
                e.target.src = "/images/products/headphones.jpg";
              }}
            />
          </div>

          <div className="file-upload-wrapper" style={{ margin: "14px 0" }}>
            <label
              htmlFor="file-upload-create"
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
              id="file-upload-create"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </div>

          <p style={{ fontSize: "13px", color: "#64748b", margin: "12px 0 8px 0" }}>
            Or select a preset product image:
          </p>

          <div className="image-options">
            {productImages.map((image) => (
              <button
                type="button"
                key={image.value}
                className={`image-option ${
                  form.image === image.value
                    ? "selected"
                    : ""
                }`}
                onClick={() => selectImage(image.value)}
              >
                <img
                  src={image.value}
                  alt={image.name}
                />

                <span>{image.name}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="primary-btn"
          disabled={saving}
        >
          {saving ? "Creating..." : "Create Product"}
        </button>
      </form>
    </main>
  );
}

export default ProductCreate;
