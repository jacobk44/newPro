const { response } = require("express");
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('orders')
      .find();

    const users = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error retrieving contacts',
      error: error.message,
    });
  }
};



const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);

    const order = await mongodb
      .getDatabase()
      .db()
      .collection("orders")
      .findOne({ _id: userId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(order);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error retrieving order",
      error: error.message,
    });
  }
};
  


const createProduct = async (req, res) => {
  // swagger.tags =[contacts]
  try {
    const order = {
      user_id: req.body.user_id,
      order_date: req.body.order_date,
      total_amount: req.body.total_amount,
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
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while creating the contact",
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
      user_id: req.body.user_id,
      order_date: req.body.order_date,
      total_amount: req.body.total_amount,
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
