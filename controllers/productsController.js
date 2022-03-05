const getALlProductsStatic = async (req, res) => {
    res.status(200).json({message: 'products testing route'})
}
const getALlProducts = async (req, res) => {
    res.status(200).json({message: 'products route'})
}

module.exports = {
    getALlProducts,getALlProductsStatic
}