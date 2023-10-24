import getCountryIso3 from "country-iso-2-to-3";
import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import Transactions from "../models/Transaction.js";
import User from "../models/User.js";

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
    res.status(200).json(productsWithStats)

} catch (error) {
   res.status(400).json({message: error.message})   
  }
}


export const getCustomers = async(req, res) => {
 try {
   const customers = await User.find({role: "user"}).select("-password")
   res.status(200).json(customers)
 } catch (error) {
  res.status(400).json({message: error.message})   
 }
} 


export const getTransactions = async(req, res) => {
  try {
    const {page = 1, pageSize = 20, sort = null, search=""} = req.query
    console.log("sort", sort)

    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1: -1),
      }
      console.log("sortFormatted", sortFormatted)
      return sortFormatted;
    }
    
    const sortFormatted = Boolean(sort)?generateSort(): {};
    console.log("sortFormatted", sortFormatted)

    const transactions = await Transactions.find({
      $or: [
         {cost: {$regex: new RegExp(search, "i")}},
         {userId:{$regex: new RegExp(search, "i")}},
      ]
    })
    .sort(sortFormatted)
    .skip(page * pageSize)
    .limit(pageSize)
    console.log("THis is transactions", transactions)
    
    const total = await Transactions.countDocuments({
      name: { $regex: search, $options: "i" },
    });
    console.log("total", total)
    
    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

export const getGeography = async(req, res) => {
  try {
    const users = await User.find()
    
    const mappedLocations = users.reduce((acc, {country}) => {
      const countryISO3 = getCountryIso3(country);
      if(!acc[countryISO3]) {
        acc[countryISO3] = 0
      }
      acc[countryISO3]++
      return acc;
    }, {})
    
    console.log(mappedLocations)

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );
    console.log(formattedLocations)
    
    res.status(200).json(formattedLocations)
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}








