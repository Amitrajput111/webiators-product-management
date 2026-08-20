const express = require("express");
const upload = require("../middlewares/uploadMiddleware");

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const protect = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validateMiddleware");
const { productSchema } = require("../validators/productValidator");

const router = express.Router();

// Public
router.get("/", getProducts);

// Protected image upload
router.post(
  "/upload-image",
  protect,
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image",
      });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      data: {
        image: imageUrl,
      },
    });
  }
);

// Product by ID
router.get("/:id", getProduct);

// Protected CRUD
router.post(
  "/",
  protect,
  validate(productSchema),
  createProduct
);

router.put(
  "/:id",
  protect,
  validate(productSchema),
  updateProduct
);

router.delete(
  "/:id",
  protect,
  deleteProduct
);

module.exports = router;