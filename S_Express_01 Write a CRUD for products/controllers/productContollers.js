
import { object, string, number} from 'yup';
import {uid} from 'uid';

  let userSchema = object({
    title: string().required(),
    price: number().required().positive(),
    description: string().required(),
    categoryId: number().required().positive(),
    Images: object(),
    
  });


let products = [{name:"trousers", price:100, category_id: 1}];

 export const getProducts =(req,res) => {

    res.status(200);
    res.send(JSON.stringify(products));
    res.end();
}

export const getProduct = (req,res) => {
     let id = req.params.id;
     let product = products.find(product => product.id === id);
     if(product){
      res.status(200);
      res.send(JSON.stringify(product));
     }else{
      res.status(404);
      res.send("Product is not Found");
     }
      
      res.end();
}
export const createProduct = (req,res) => {
    let body = req.body;
    let valid = userSchema.validateSync(body,{
        strict:true
      });
      const {title,price,description,images,categoryId} = req.body;
      if(valid){
        let product = {
            id: uid(),
            title,
            price,
            description,
            images,
            categoryId
        }
        res.status(201);
        products.push(product);
        res.send(JSON.stringify(products));
      }
      else{
        res.status(401);
        res.send("Invalid Data");
      }
      res.end();

}


export const updateProduct =  (req,res) => {
    let id = req.params.id;
    let body = req.body;
    let valid = userSchema.validateSync(body,{
        strict:true
      });
   
    let idx = products.findIndex(product => product.id === id);
    let product = products[idx];
    if(valid){
        product = {...product,...body};
        res.status(200);
        res.send(JSON.stringify(product));
    }
    else{
       res.status(401);
        res.send("Invalid Data");
    }
    res.end();
   
}

export const deleteProduct = (req,res) => {
    let id = req.params.id;
    let idx = products.findIndex(product => product.id === id);
    let product = products[idx];
    products.splice(idx,1);
    res.send(JSON.stringify(product));

    res.end();
}

/* module.exports ={
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} */
