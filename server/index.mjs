import express from "express";
import mongoose from "mongoose";
import { productRouter } from "./routes/products.mjs";

const app = express();

// middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// routes
app.use("/api/products", productRouter);

mongoose
  .connect(
    "mongodb+srv://sandroxari:10eSX3MJaZdKSiI8@cluster0.5sh3jlu.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0"
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
