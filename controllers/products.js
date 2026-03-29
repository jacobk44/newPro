const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

// Get all products
const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("products")
      .find();

    const products = await result.toArray();

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving products",
      error: error.message,
    });
  }
};

// Get a single product

const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);

    const product = await mongodb
      .getDatabase()
      .db()
      .collection("products")
      .findOne({ _id: userId });

    if (!product) {
      return res.status(404).json({ message: "products not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error retrieving order",
      error: error.message,
    });
  }
};
  

// Create a new product
const createProduct = async (req, res) => {
  try {
    const product = {
      productName: req.body.productName,
      description: req.body.description,
      price: req.body.price,
      stockQuantity: req.body.stockQuantity,
    };

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("products")
      .insertOne(product);

    if (result.acknowledged) {
      res.status(201).json(result);
    } else {
      res.status(500).json({ error: "Error creating product" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || !ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const productId = new ObjectId(id);

    const updatedProduct = {
      productName: req.body.productName,
      description: req.body.description,
      price: req.body.price,
      stockQuantity: req.body.stockQuantity,
    };

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("products")
      .replaceOne({ _id: productId }, updatedProduct);

    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Product not updated or not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || !ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const productId = new ObjectId(id);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("products")
      .deleteOne({ _id: productId });

    if (result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createProduct,
  updateProduct,
  deleteProduct,
};