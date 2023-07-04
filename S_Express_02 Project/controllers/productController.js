
import { object, string, number} from 'yup';
import { uid } from 'uid';
import { validateProduct } from '../middleware/productValidation.js';

import { products } from '../model/product.js';
import { categories } from '../model/category.js';

  let userSchema = object({
    name: string().required(),
    price: number().required().positive(),
    category_id: string().required(),
  });


 

export const getProducts = (req,res) => {
    console.log("GetProducts");
    res.status(200).send(products);
    res.end();
}

export const getProduct = (req,res) => {
    let id = req.params.id;
    let product = products.find(product => product.id === id);
    if(product){
     res.status(200).send(JSON.stringify(product));
    }else{
    
     res.status(404).send("Product is not Found");
    }   
     res.end();
}



export const createProduct = (req,res) => {
  try{
    let body = req.body;
    const {name, price,category_id} = body;
    const errors = validateProduct(name,price,category_id);
    if(errors.length > 0){
      res.status(401).json(errors);
    }

    let valid = userSchema.validateSync(body,{
        strict:true
      });
       
         if(valid){
            let product = {
                id: uid(),
                name,
                price,
                category_id,
            }
            products.push(product);
            res.status(201).json(products);
          }
      }
     catch(error){
      res.status(401).json({
                              "Message":"Invalid Data",
                              "Error": error 
                            });
     }
                                    
      res.end();
   }


export const updateProduct = (req,res) => {

      let id = req.params.id;
      let body = req.body;

      const {name, price,category_id} = body;
      let errors = [];
     errors =  validateProduct(name,price,category_id);
      if(errors.length > 0){
        res.status(401).json(errors);
      }

      let valid = userSchema.validateSync(body,{
          strict:true
        });
   
      if(valid){
          console.log("Valid",valid);
         let idx = products.findIndex(product => product.id == id);
         console.log("Idx", idx);
         let product = products[idx];

         console.log("Product",product);
      
          products[idx] = {...products[idx], ...body};
          console.log("Product",product);
          console.log("products", products);
   
          res.status(200).json(products);
      }
    
  res.end();
}


export const deleteProduct = (req,res) => {
  try{
    let id = req.params.id;
    let idx = products.findIndex(product => product.id=== id);
    console.log(idx);
    const product = products[idx]
    if(idx !== -1) {
        products.splice(idx,1);
        res.json(product);
    }
    else {
      throw error;
    }
  
  }
 
    catch(error){
      res.status(401).json({
                              "Message":"Invalid Data, This Id isn't existed",
                              "Error": error 
                            });
     }
     res.end();
}


