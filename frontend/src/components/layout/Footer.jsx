import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>Vellora</h3>
          <p>Defining modern luxury. Curated collections of the finest timepieces, accessories, and apparel.</p>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <ul className="footer-links">
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/products?category=Watches">Timepieces</Link></li>
            <li><Link to="/products?category=Bags">Leather Goods</Link></li>
            <li><Link to="/products?category=Fragrances">Fragrances</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>About</h4>
          <ul className="footer-links">
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Sustainability</a></li>
            <li><a href="#">Boutiques</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Customer Care</h4>
          <ul className="footer-links">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Track Order</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Vellora. All rights reserved.</span>
        <div>
          <span style={{ marginRight: '16px' }}>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
