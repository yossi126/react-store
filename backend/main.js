const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
const cors = require("cors");

//connectDB
const connectDB = require("./db/connect");

//routers
const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");
const orderRouter = require("./routes/orderRoutes");
const purchaseRouter = require("./routes/purchaseRoutes");
const userRouter = require("./routes/userRoutes");

const { addProductsToDB } = require("./utils/products");
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/purchase", purchaseRouter);
app.use("/users", userRouter);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
    //await addProductsToDB();
  } catch (error) {
    console.log(error);
  }
};

start();
