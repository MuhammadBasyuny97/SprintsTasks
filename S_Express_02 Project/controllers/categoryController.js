
import { validateCategory } from './../middleware/categoryValidation.js';


export const categories = ["trousers","shoes","accessories","shirts","kids"];


export const getCategories = (req,res) => {
    res.status(200).send(categories);
    res.end();
}

export const getCategory = (req,res) => {
    let id = req.params.id;
    let category = categories.find(category => category === id);
    if(category){
     res.status(200).send(JSON.stringify(category));
    }else{
    
     res.status(404).send("Category is not Found");
    }   
     res.end();
}



export const createCategory = (req,res) => {
  try{
    let body = req.body;
    const {name} = body;
    
    const errors = validateCategory(name);
    console.log(name);
    if(errors.length > 0){
      res.status(401).json(errors);
    }
 
     categories.push(name);
     res.status(201).json(categories);   
    }
      
     catch(error){
      res.status(401).json({
                              "Message":"Invalid Data",
                              "Error": error 
                            });
     }
                                    
      res.end();
   }


export const updateCategory = (req,res) => {
  try{

      let id = req.params.id;
      let body = req.body;

      const {name} = body;
      let errors = [];
      errors = validateCategory(name);
      if(errors.length > 0){
        res.status(401).json(errors);
      }

         let idx = categories.findIndex(category => category === id);
         let category = categories[idx];

      
         categories[idx] = name;
   
          res.status(200).json(categories);
    }

   catch(error){
    res.status(401).json({
                            "Message":"Invalid Data",
                            "Error": error 
                           });
                         
   } 
  res.end();
}


export const deleteCategory = (req,res) => {
  try{
    let id = req.params.id;
    let idx = categories.findIndex(category => product === id);
    console.log(idx);
    const category = categories[idx]
    if(idx !== -1) {
        products.splice(idx,1);
        res.json(category);
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


