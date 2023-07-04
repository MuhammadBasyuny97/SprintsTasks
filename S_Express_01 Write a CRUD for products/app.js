import { getProducts,getProduct,createProduct,updateProduct ,deleteProduct} from './controllers/productContollers.js';

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
