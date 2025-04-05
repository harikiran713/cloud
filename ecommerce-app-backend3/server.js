import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'
import connectDB from './config/mongodb.js'
import {connectCloudinary} from './config/cloudinary.js'

import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App Config
const app = express()
const port = process.env.PORT || 4001
connectDB()
connectCloudinary()

// Middlewares 

app.use(express.json())
app.use(cors())

// Api endpoint


app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
    res.send("API Working")
})


app.listen(port, () => console.log('Server Started on PORT:' + port))