const { response } = require("express");
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection("orders").find();
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
    .collection("orders")
    .find({ _id: userId });
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users[0]);
  });
};

const createProduct = async (req, res) => {
  // swagger.tags =[contacts]
  const order = {
    user_id: Number(req.body.user_id),
    order_date: req.body.order_date,
    total_amount: Number(req.body.total_amount),
    status: req.body.status,
  };

  const result = await mongodb
    .getDatabase()
    .db()
    .collection("orders")
    .insertOne(order);

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
      return res.status(400).json({ error: "Invalid order ID" });
    }

    const orderId = new ObjectId(req.params.id);

    const order = {
      user_id: Number(req.body.user_id),
      order_date: req.body.order_date,
      total_amount: Number(req.body.total_amount),
      status: req.body.status,
    };

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("orders")
      .replaceOne({ _id: orderId }, order);

    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: "Order not updated" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  // swagger.tags =[contacts]
  try {
    const orderId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("orders")
      .deleteOne({ _id: orderId });

    if (result.deletedCount > 0) {
      res.status(204).send(); // Successfully deleted
    } else {
      res.status(404).json({ error: "Order not found" });
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
