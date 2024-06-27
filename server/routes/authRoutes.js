const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

function validatePassword(password) {
  return password.length >= 8;
}

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, username, password, confirmPassword } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !username ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).send("All fields are required");
    }

    if (!validatePassword(password)) {
      return res
        .status(400)
        .send("Password must be at least 8 characters long.");
    }

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send("Username already exists");
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).send("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send("User created");
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).send("Registration failed");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send("Username and password are required");
    }

    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Invalid Credentials");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, firstName: user.firstName });
  } catch (error) {
    console.error("Login error:", error);
    res.status(400).send("Login failed");
  }
});

module.exports = router;
