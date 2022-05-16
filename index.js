const express=require('express');
const{urlencoded,json}=require('express');
const cors=require("cors");
const app=express();
const userRouter=require('./user');
const addressrouter=require('./address');
const dotenv=require('dotenv');
const  auth=require('./auth');
const fileUpload=require('express-fileupload');
dotenv.config();
const stripe =require('stripe')(process.env.STRIPE_KEY);
const pay=async()=>{
   
const paymentIntent = await stripe.paymentIntents.create({
    amount: 2000,
    currency: 'inr',
    payment_method_types: ['card'],
  });
    console.log(paymentIntent);
}
pay();
const productRouter=require('./products');
app.use(json());
app.use(cors());
app.use(auth);
app.use(fileUpload());
app.use(urlencoded({extended:false}));
app.use('/user',userRouter);
app.use('/address',addressrouter);
app.use('/products',productRouter);
app.listen(5000);
