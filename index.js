const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const db = require("./models");

mongoose.connect(
  process.env.MONGODB_URI
)
.then(() => console.log("Connection Successful"))
.catch((err) => console.error("Connection Error:", err));

const authRoute = require("./routes/auth.routes");
const addressRoute = require("./routes/address.routes");
const ownerRoute = require("./routes/owner.route");
const userRoute = require("./routes/user.routes");
app.use("/api/auth", authRoute)
app.use("/api", addressRoute)
app.use('/api/owner', ownerRoute)
app.use('/api/user', userRoute)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});