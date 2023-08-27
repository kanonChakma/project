import Product from "../models/Product.js"
import ProductStat from "../models/ProductStat.js"

export const getProduct = async(req, res) => {
  try {
    const products = await Product.find()
    const productsWithStats = await Promise.all(
      products.map(async(product) => {
        const stat = await ProductStat.find({
            productId: product._id
        });
        return {
            ...product._doc,
            stat,
        }
      })
    )
    console.log(productsWithStats)
    res.status(200).json(productsWithStats)

} catch (error) {
  console.log(error)
   res.status(400).json({message: error.message})   
  }
}