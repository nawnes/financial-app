const express = require("express");
const Transaction = require("../models/Transaction");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const { type, amount, category } = req.body;
  try {
    const transaction = new Transaction({
      user: req.user.id,
      type,
      amount,
      category,
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: "Transaction creation failed" });
  }
});

// // Route pour obtenir les transactions de l'utilisateur connecté
// router.get('/transactions', auth, async (req, res) => {
//   try {
//     const transactions = await Transaction.find({ userId: req.user.id });
//     res.json(transactions);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

module.exports = router;
