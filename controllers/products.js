const { response } = require("express");
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection("products").find();
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("products")
    .find({ _id: userId });
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users[0]);
  });
};

const createProduct = async (req, res) => {
  // swagger.tags =[contacts]
  const product = {
    productName: req.body.productName,
    description: req.body.description,
    price: req.body.price,
    stackQuantity: req.body.stackQuantity,
  };

  const result = await mongodb
    .getDatabase()
    .db()
    .collection("products")
    .insertOne(product);

  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res.status(500).json({
      error: "Some error occurred while creating the contact",
    });
  }
};

const updateProduct = async (req, res) => {
  // swagger.tags =[contacts]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const productId = new ObjectId(req.params.id);

    const product = {
      productName: req.body.productName,
      description: req.body.description,
      price: req.body.price,
      stackQuantity: req.body.stackQuantity,
    };

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("products")
      .replaceOne({ _id: productId }, product);

    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: "Product not updated" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  // swagger.tags =[contacts]
  try {
    const productId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("products")
      .deleteOne({ _id: productId });

    if (result.deletedCount > 0) {
      res.status(204).send(); // Successfully deleted
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
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
