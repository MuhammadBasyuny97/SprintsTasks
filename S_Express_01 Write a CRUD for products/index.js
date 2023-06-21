import { getProducts,getProduct,createProduct,updateProduct ,deleteProduct} from './actions';



const express = require('express');
const app = express();


app.get('/products', getProducts(req,res));

app.get('/product/:id' , getProduct(req,res))


app.post('/products',createProduct(req,res))
app.put('/product/:id/:price/:title' ,updateProduct(req,res))
app.delete('/product/:id' , deleteProduct(req,res));


app.listen(3000, () => {
    console.log('Server is running successfully on Port 3000');
})