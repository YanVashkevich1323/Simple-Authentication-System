const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AccountsModel = require("./models/Accounts");


const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/accounts");


app.post('/login', async (req, res) => {

  const { email, password } = req.body;

  try {
    const user = await AccountsModel.findOne({ email });
    if (!user) return res.json({ message: "No account to this email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ message: "The password is incorrect" });

    const token = jwt.sign({ email }, "secret_key", { expiresIn: "30m" });

    res.json({ message: "Success", token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
  
});

app.post("/signup", async (req, res) => {

  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  AccountsModel.create({ email, password: hashedPassword })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json(err));
    
});

const verifyToken = (req, res, next) => {

  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
  
};

app.get("/welcome", verifyToken, (req, res) => {
  res.json({ message: `Hello, ${req.user.email}` });
});



app.listen(3001, () => {
  console.log("Server running on port 3001");
});
