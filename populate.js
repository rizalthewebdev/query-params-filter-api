require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/productModel");

const jsonProduct = require("./products.json");

const start = async () => {
   try {
      // Connect to MongoDB
      await connectDB(process.env.MONGODB_URI).then(() =>
         console.log("Connected")
      );
      
      // Delete all data on DB
      await Product.deleteMany();

      // Add data from json file
      await Product.create(jsonProduct).then(() => console.log("Data added successfully"))
   } catch (error) {
      console.log({ message: error.message });
   }
};

start();
