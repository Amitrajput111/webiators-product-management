const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://amitrajput98267313_db_user:GgM0pR7k7gFUByqz@producthub-cluster.qh2y86m.mongodb.net/producthub?retryWrites=true&w=majority&appName=producthub-cluster';

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  stock: Number,
  createdBy: mongoose.Schema.Types.ObjectId,
});

const Product = mongoose.model('Product', productSchema);

// We need a user ID for createdBy. We can fetch one user.
const userSchema = new mongoose.Schema({ name: String });
const User = mongoose.model('User', userSchema);

const luxuryProducts = [
  {
    name: "Aura Chronograph Gold",
    description: "A masterpiece of horology. Featuring an 18k rose gold case, intricate chronograph movement, and a hand-stitched alligator leather strap. Crafted for the modern connoisseur.",
    price: 185000,
    category: "Watches",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1480&auto=format&fit=crop",
    stock: 5,
  },
  {
    name: "Classic Quilted Leather Tote",
    description: "The epitome of timeless elegance. Handcrafted from premium Italian calfskin leather with signature gold-tone hardware and diamond quilting. Spacious enough for your daily essentials.",
    price: 125000,
    category: "Bags",
    image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1915&auto=format&fit=crop",
    stock: 12,
  },
  {
    name: "Oud Noir Eau de Parfum",
    description: "An intoxicating blend of rare oud wood, spicy cardamom, and sensual amber. A long-lasting, sophisticated fragrance that leaves a memorable trail.",
    price: 24500,
    category: "Fragrances",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1887&auto=format&fit=crop",
    stock: 35,
  },
  {
    name: "Diamond Solitaire Pendant",
    description: "A flawless 1.5-carat round brilliant cut diamond set in a minimalist platinum four-prong setting. Suspended on a delicate 18k white gold chain.",
    price: 345000,
    category: "Jewelry",
    image: "https://images.unsplash.com/photo-1599643477874-5c866f466cb2?q=80&w=1974&auto=format&fit=crop",
    stock: 3,
  },
  {
    name: "Vellora Signature Sunglasses",
    description: "Oversized acetate frames with polarized gradient lenses and gold-plated temple accents. Offers 100% UV protection with unparalleled style.",
    price: 32000,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2080&auto=format&fit=crop",
    stock: 18,
  },
  {
    name: "Silk Evening Gown",
    description: "Flowing pure silk evening dress featuring a dramatic plunging neckline, subtle pleating, and a sweeping train. Designed for unforgettable moments.",
    price: 85000,
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1566160983275-c548481ff23b?q=80&w=1965&auto=format&fit=crop",
    stock: 8,
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to DB");

    const user = await User.findOne();
    if (!user) {
      console.log("No user found, creating a dummy user...");
      const dummyUser = await User.create({ name: "Admin User", email: "admin@vellora.com", password: "password" });
      var userId = dummyUser._id;
    } else {
      var userId = user._id;
    }

    console.log("Clearing old products...");
    await Product.deleteMany({});
    
    console.log("Seeding luxury products...");
    const productsWithUser = luxuryProducts.map(p => ({ ...p, createdBy: userId }));
    await Product.insertMany(productsWithUser);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
