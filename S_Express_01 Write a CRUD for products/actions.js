
import { object, string, number} from 'yup';


  let userSchema = object({
    title: string().required(),
    price: number().required().positive(),
    description: string().required(),
    categoryId: number().required().positive(),
    Images: object(),
    
  });


let products = [];

export const getProducts =(req,res) => {
    res.send(JSON.stringify(products));
}

export const getProduct = (req,res) => {
    let id = req.params;
    let product = products.find(product => product.id === id);

    res.send(JSON.stringify(product));
}

export const createProduct = (req,res) => {
    let body = req.body;
    let valid = userSchema.validateSync(body,{
        strict:true
      });
      const {title,price,description,images,categoryId} = req.body;
      if(valid){
        let product = {
            title,
            price,
            description,
            images,
            categoryId
        }
        products.push(product);
        res.send(JSON.stringify(products));
      }
      else{
        res.send("Invalid Data");
      }


}


export const updateProdcut =  (req,res) => {
    let id = req.params[0];
    let body = req.body;
    let valid = userSchema.validateSync(body,{
        strict:true
      });
   
    let idx = products.findIndex(product => product.id === id);
    let product = products[idx];
    if(valid){
        product = {...product,...body};
        res.send(JSON.stringify(product));
    }
    else{
        res.send("Invalid Data");
    }
   
}


export const deletProduct = (req,res) => {
    let id = req.params;
    let idx = products.findIndex(product => product.id === id);
    let product = products[idx];
    products.splice(idx,1);
    res.send(JSON.stringify(product));
}