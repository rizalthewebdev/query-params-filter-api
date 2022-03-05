const express = require("express");
const { getALlProducts, getALlProductsStatic } = require("../controllers/productsController");
const router = express.Router();

router.route("/").get(getALlProducts).post();
router.route("/static").get(getALlProductsStatic)
router.route("/:id").get().patch().delete()

module.exports = router;
