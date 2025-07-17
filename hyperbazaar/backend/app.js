// app.js
require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoute = require("./router/auth-router");
const authCategory = require("./router/categoryRoutes");
const authProduct = require("./router/productRoutes");
const authStore = require("./router/storeRoute");
const authOrder = require("./router/orderRouter");
const bid=require("./router/bidroute");
const connectdb = require("./utils/db");
// const validate = require('./middleware/validate-middleware'); // Assuming you have a validate middleware
// const signupSchema = require('./validater/auth-validater');
const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());
// app.use("/api/auth", validate(signupSchema), authRoute); 
app.use("/api/auth", authRoute); 
app.use("/api/vi/category", authCategory); 
app.use("/api/vi/product", authProduct);
app.use("/api/vi/store", authStore);
app.use("/api/vi/order",authOrder);
app.use("/api/vi/bid",bid);


const PORT = 3000;

connectdb().then(() => {
   app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running at port : ${PORT}`);
   });
});

