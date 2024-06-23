import express from "express";
import mongoose from "mongoose";
import { productRouter } from "./routes/products.mjs";
import { managerRouter } from "./routes/managers.mjs";

const app = express();

// middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "*"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// routes
app.use("/api/products", productRouter);
app.use(
  "/api/sales-managers",
  managerRouter
);

mongoose
  .connect(
    "mongodb+srv://sandroxari:10eSX3MJaZdKSiI8@cluster0.5sh3jlu.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(
      "Connected to database"
    );
    app.listen(8000, () => {
      console.log(
        "Server is running on port 8000"
      );
    });
  })
  .catch(() => {
    console.log(
      "Error connecting to database"
    );
  });
