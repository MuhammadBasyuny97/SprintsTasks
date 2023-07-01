import { getProducts,getProduct,createProduct, updateProduct,deleteProduct} from "../controllers/productController.js";
import { verifyToken } from "../middleware/userAuthentication.js";
import express from "express";
import { checkRoles } from "../middleware/userAuthorization.js";


const router = express.Router();


router.get('/getProducts', verifyToken,checkRoles("product.list"),getProducts);
router.get('/getProduct/:id',verifyToken,checkRoles("product.get"), getProduct);
router.post('/createProduct',verifyToken,checkRoles("product.create"),createProduct);
router.put('/updateProduct/:id',verifyToken,checkRoles("product.update"),updateProduct);
router.delete('/deleteProduct/:id',verifyToken,checkRoles("product.delete"),deleteProduct);

export {router};