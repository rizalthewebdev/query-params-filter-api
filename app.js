require("express-async-errors");
require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connect");
const products = require("./routes/productsRoutes");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
   res.send(
      '<h1>Store API</h1><a href="/api/v1/products">go to products</a><br><h3>Learn to filtering data using query parameters</h3>'
   );
});


// Route Middleware
app.use("/api/v1/products", products);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;

const start = async () => {
   try {
      // Connect to MongoDB
      await connectDB(uri).then(() => console.log("Connected to MongoDB"));
      app.listen(
         port,
         console.log(`Server listening on http://localhost:${port}`)
      );
   } catch (err) {
      console.log({ message: err.message });
   }
};

start();
