import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
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

      const response = await fetch(
        "http://localhost:5000/api/products",
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
            image: "https://placehold.co/600x400",
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
