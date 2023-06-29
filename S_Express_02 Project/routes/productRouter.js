import { getProducts,getProduct,createProduct, updateProduct,deleteProduct} from "../controllers/productController.js";
import { verifyToken } from "../middleware/userAuthentication.js";
import express from "express";

const router = express.Router();


router.get('/getProducts', verifyToken,getProducts);
router.get('/getProduct/:id',verifyToken, getProduct);
router.post('/createProduct',verifyToken,createProduct);
router.put('/updateProduct/:id',verifyToken,updateProduct);
router.delete('/deleteProduct/:id', deleteProduct);

export {router};