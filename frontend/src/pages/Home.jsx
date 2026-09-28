import { Link } from "react-router-dom";
import products from "../data/products";

const Home = () => {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Timeless Elegance</h1>
          <p>Discover our curated collection of luxury timepieces, designer bags, and exquisite fine jewelry crafted for the modern connoisseur.</p>
          <Link to="/products" className="primary-btn hero-btn">
            Explore the Collection
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="home-section animate-fade-up">
        <div className="section-header">
          <h2>The Art of Luxury</h2>
          <p>Exceptional Quality, Uncompromising Design</p>
        </div>
        
        <div className="categories-grid">
          {[
            { name: "Timepieces", link: "?category=Watches", img: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1994&auto=format&fit=crop" },
            { name: "Leather Goods", link: "?category=Bags", img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1974&auto=format&fit=crop" },
            { name: "Fine Jewelry", link: "?category=Jewelry", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop" }
          ].map((cat, idx) => (
            <div key={idx} className="category-card">
              <img src={cat.img} alt={cat.name} className="category-img" />
              <div className="category-overlay">
                <h3>{cat.name}</h3>
                <Link to={`/products${cat.link}`} className="category-link">Shop Collection</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="home-section" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="section-header">
          <h2>Vellora Exclusives</h2>
          <p>Curated For The Connoisseur</p>
        </div>
        
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <article className="product-card" key={product._id || product.id}>
              <Link to={`/products/${product._id || product.id}`}>
                <div className="product-image-wrapper">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                </div>
              </Link>

              <div className="product-content">
                <span className="product-category">{product.category}</span>
                <Link to={`/products/${product._id || product.id}`}>
                  <h2>{product.name}</h2>
                </Link>
                <div className="product-footer">
                  <strong>₹{Number(product.price).toLocaleString("en-IN")}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '80px' }}>
          <Link to="/products" className="secondary-btn">View Full Collection</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
