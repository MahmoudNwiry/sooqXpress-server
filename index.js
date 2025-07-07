const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const http = require('http')
require("dotenv").config();
const { initSocket } = require('./socket');
const server = http.createServer(app);
const { getSignedUrl } = require('./s3.js');

const port = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const db = require("./models");

const io = initSocket(server);

mongoose.connect(
  process.env.MONGODB_URI
)
.then(() => console.log("Connection Successful"))
.catch((err) => console.error("Connection Error:", err));

const addressRoute = require("./routes/address.routes");  // Importing address routes

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api", addressRoute)                             // move address route to admin route
app.use('/api/owner', require("./routes/owner.route"))
app.use('/api/admin', require("./routes/admin.routes"))
app.use('/api/shop', require('./routes/shop.routes'));
app.use('/api/user', require("./routes/user.routes"))
app.get('/api/s3-url', getSignedUrl);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});