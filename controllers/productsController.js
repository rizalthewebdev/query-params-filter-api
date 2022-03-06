const Product = require("../models/productModel");

const getAllProducts = async (req, res) => {
   // Get data from query parameters
   const { name, gender, brand, sort, fields, numericFilters } = req.query;

   // Create data to store the query
   const queryObject = {};

   // Get data based on name where inputed in query parameter
   if (name) queryObject.name = { $regex: name, $options: "i" };

   // Get data based on gender
   if (gender) queryObject.gender = gender;

   // Get data based on brand
   if (brand) queryObject.brand = brand;

   // Get data with filtered price
   if (numericFilters) {
      const operatorMap = {
         ">": "$gt",
         ">=": "$gte",
         "=": "$eq",
         "<": "$lt",
         "<=": "$lte",
      };
      const regEx = /\b(<|>|>=|=|<|<=)\b/g;
      let filters = numericFilters.replace(
         regEx,
         (match) => `-${operatorMap[match]}-`
      );

      const options = ["price"];
      filters = filters.split(",").forEach((item) => {
         const [field, operator, value] = item.split("-");
         if (options.includes(field)) {
            queryObject[field] = { [operator]: Number(value) };
         }
      });
      console.log(queryObject);
   }

   // Query to search from the data in MongoDB with mongoose
   let result = Product.find(queryObject);

   // Sort data
   if (sort) {
      const sortList = sort.split(",").join(" ");
      result = result.sort(sortList);
   } else {
      result = result.sort("createdAt");
   }

   // Select the property of data to show
   if (fields) {
      const fieldList = fields.split(",").join(" ");
      result.select(fieldList);
   }

   // Filter total data to show
   const page = Number(req.query.page) || 1;
   const limit = Number(req.query.limit);
   const skip = (page - 1) * limit;
   result = result.skip(skip).limit(limit);

   // Send data to response
   const products = await result;
   res.status(200).json({ products, totalProducts: products.length });
};

module.exports = {
   getAllProducts,
};
