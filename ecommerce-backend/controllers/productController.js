import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js"
//Function for add product

const addProduct = async (req, res) => {  
    try {  
      const {  
        name,  
        description,  
        category,  
        subCategory,  
        price,  
        sizes,  
        bestseller,  
        images  
      } = req.body;  
  
      // Ensure `images` is an array, no need for JSON.parse if it's already an array
      const productData = {  
        name,  
        description,  
        category,  
        subCategory,  
        price: Number(price),  
        bestseller: bestseller === "true",  
        sizes: Array.isArray(sizes) ? sizes : JSON.parse(sizes),  // Safely parse sizes if it's a string
        image: Array.isArray(images) ? images : JSON.parse(images),  // Same here for images
        date: Date.now()  
      };  
  
      // Create and save product
      const product = new productModel(productData);  
      await product.save();  
  
      res.json({ success: true, message: "Product Added" });  
    } catch (error) {  
      console.log(error);  
      res.json({ success: false, message: error.message });  
    }  
  };
  
//Function for List product

const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//Function for Removing product

const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product Removed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//Function for Single product info

const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({ success: true, product })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


export { addProduct, listProduct, removeProduct, singleProduct }
