import { getProducts,getProduct,createProduct,updateProduct ,deleteProduct} from './controllers/productContollers.js';

/* const getProducts = require('./actions.js');
const getProduct =  require('./actions.js');
const createProduct = require('./actions.js');
const updateProduct = require('./actions.js');
const deleteProduct = require('./actions.js'); */

//const ctr = require('./actions');




import express from 'express';

const app = express();


app.get('/products', getProducts);

app.get('/product/:id', getProduct)


app.post('/createProduct',createProduct)
app.put('/updateProduct/:id' ,updateProduct)
app.delete('/deleteProduct/:id' , deleteProduct);


app.listen(3000, () => {
    console.log('Server is running successfully on Port 3000');
})