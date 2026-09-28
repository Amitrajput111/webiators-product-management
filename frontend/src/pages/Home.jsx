import { Link } from "react-router-dom";
import products from "../data/products";

const Home = () => {
  // Get top 4 products to feature on the homepage
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Discover True Elegance</h1>
          <p>Explore our curated collection of luxury timepieces, designer bags, and exquisite fine jewelry.</p>
          <Link to="/products" className="primary-btn hero-btn">
            Shop the Collection
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="home-section">
        <div className="section-header">
          <h2>Featured Categories</h2>
          <p>Exceptional Quality, Timeless Design</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {[
            { name: "Timepieces", img: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1994&auto=format&fit=crop" },
            { name: "Leather Goods", img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1974&auto=format&fit=crop" },
            { name: "Fine Jewelry", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop" }
          ].map((cat, idx) => (
            <div key={idx} style={{ position: 'relative', height: '400px', overflow: 'hidden', group: 'cat' }}>
              <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }} className="cat-img" />
              <div style={{ position: 'absolute', inset: '0', background: 'rgba(0,0,0,0.2)' }}></div>
              <div style={{ position: 'absolute', bottom: '30px', left: '30px', color: 'white' }}>
                <h3 style={{ fontSize: '24px', color: 'white', marginBottom: '8px' }}>{cat.name}</h3>
                <Link to="/products" style={{ color: 'white', borderBottom: '1px solid white', paddingBottom: '2px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Explore</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="home-section" style={{ background: '#ffffff' }}>
        <div className="section-header">
          <h2>Vellora Exclusives</h2>
          <p>Curated For The Connoisseur</p>
        </div>
        
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <article className="product-card" key={product._id}>
              <Link to={`/products/${product._id}`}>
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
                <Link to={`/products/${product._id}`}>
                  <h2>{product.name}</h2>
                </Link>
                <div className="product-footer">
                  <strong>₹{Number(product.price).toLocaleString("en-IN")}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Link to="/products" className="secondary-btn">View All Products</Link>
        </div>
      </section>
      
      <style dangerouslySetInnerHTML={{__html: `
        .cat-img:hover { transform: scale(1.05); }
      `}} />
    </div>
  );
};

export default Home;
