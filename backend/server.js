require ('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')
const path = require("path");
const app = express();
const productRoutes = require('./routes/productRouter')
const userRoutes = require('./routes/userRouter')
const categoryRoutes = require('./routes/categoryRouter')
const checkoutRoutes = require('./routes/checkoutRouter')
const orderDetailRoutes = require('./routes/orderDetailRouter')
const adminRoutes = require('./routes/adminRouter');
const provinceRoutes = require('./routes/provinceRouter');
const districtRoutes = require('./routes/districtRouter');

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3005

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', checkoutRoutes);
app.use('/api/orderDetail', orderDetailRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/provinces', provinceRoutes);
app.use('/api/districts', districtRoutes);
//connection
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
      console.log('connected to MongoDB')
      app.listen(PORT, ()=> {
          console.log(`Node API app is running on port ${PORT}`)
      });
  }).catch((error) => {
      console.log(error)
  })

