
import { object, string, number} from 'yup';

  let userSchema = object({
    name: string().required(),
    price: number().required().positive(),
    category_id: number().required().positive(),
  });


 const products = [
    {id: Date.now() + 20 , name: "Shoes ",price: 300, category_id: 1},
    {id: Date.now() + 30 ,name: "Hat ",price: 100, category_id: 2}
]; 

const categories = [1,2,3,4,5];

export const validateProduct = (product) => {
    const {name,price,category_id}  = product;
    let message = "";
    if(typeof name !== string && name.length < 3) {
        message = "Name must be string with at least 3 characters"
        return message
    }

}

export const getProducts = (req,res) => {
    console.log("GetProducts");
    res.status(200).send(products);
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
      const {name,price,category_id} = req.body;
      if(valid){
        let product = {
            id: Date.now() + 10,
            name,
            price,
            category_id,
        }
        products.push(product);
        res.status(201).send(JSON.stringify(products));
      }
      else{
        res.status(401);
        res.send("Invalid Data");
      }
      res.end();

   }

export const updateProduct = (req,res) => {
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


