function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div>
          <strong>ProductHub</strong>
          <p>Simple and powerful product inventory management.</p>
        </div>

        <div className="footer-links">
          <a href="/products">Products</a>
          <a href="/products/new">Add Product</a>
          <a href="/products">Inventory</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 ProductHub</span>
        <span>Product Management System</span>
      </div>
    </footer>
  );
}

export default Footer;
