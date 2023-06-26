import { getProducts,getProduct,createProduct,updateProduct,deleteProduct, validateProduct} from "./controllers/product.js";
import { userLogin,userRegister,userLogout } from "./controllers/registeration.js";
//import  {bodyParser}  from "body-parser";
import dotenv from 'dotenv';
import express from "express";

const port = process.env.PORT || 5000 ;
const app = express();

dotenv.config({
    path:'config/config.env'
})

/* app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); */

app.use(express.json());


/* app.use('/products', validateProduct);
app.use('/products/:id', validateProduct) */

app.post('/user-register',userRegister);
app.post('/user-login',userLogin);
app.post('/user-logout',userLogout);

app.get('/products', getProducts);
app.get('/products/:id', getProduct);
app.post('/products',  createProduct)
app.put('/products/:id', updateProduct)
app.delete('/products/:id', deleteProduct)


app.listen(port, () => {
    console.log(`Server is Running on localhost: ${port}`);
})