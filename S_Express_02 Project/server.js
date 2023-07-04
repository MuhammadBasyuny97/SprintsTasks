
import  {router as productRouter}  from "./routes/productRouter.js";
import  {router as userRouter}  from "./routes/userRouter.js";
import  {router as categoryRouter}  from "./routes/categoryRouter.js";
import dotenv from 'dotenv';
import express from "express";

const port = process.env.PORT || 5000 ;
const app = express();

dotenv.config({
    path:'config/config.env'
})


app.use(express.json());
app.use('/user',userRouter);
app.use('/category',categoryRouter);
app.use('/product',productRouter);




app.listen(port, () => {
    console.log(`Server is Running on localhost: ${port}`);
})
