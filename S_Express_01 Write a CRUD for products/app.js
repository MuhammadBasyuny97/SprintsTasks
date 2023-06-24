import { getProducts,getProduct,createProduct,updateProduct ,deleteProduct} from './contollers.js';

/* const getProducts = require('./actions.js');
const getProduct =  require('./actions.js');
const createProduct = require('./actions.js');
const updateProduct = require('./actions.js');
const deleteProduct = require('./actions.js'); */

//const ctr = require('./actions');




import express from 'express';

const app = express();


app.get('/products', getProducts(req,res));

app.get('/product/:id', getProduct(req,res))


app.post('/createProduct',createProduct(req,res))
app.put('/updateProduct/:id' ,updateProduct(req,res))
app.delete('/deleteProduct/:id' , deleteProduct(req,res));


app.listen(3000, () => {
    console.log('Server is running successfully on Port 3000');
})