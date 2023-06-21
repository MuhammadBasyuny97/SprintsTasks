
import { getProductsData } from './getProductsModule.js';
import http from 'http';
import { object, string, number} from 'yup';




  let userSchema = object({
    title: string().required(),
    price: number().required().positive(),
    description: string().required(),
    categoryId: number().required().positive(),
    Images: object(),
    
  });

const server = http.createServer(async (req,res) => {
     let url = req.url;
     let cur;
     let data = [];

// 1- Get Products  
   if(req.method === "GET"){ 
     res.setHeader('Content-Type', "application/json");
     res.writeHead(200);
     if(url.startsWith('/products') ){
        cur = url.split("=")[1];
        cur = cur.toUpperCase();   
        data = await getProductsData(cur);
        res.write(JSON.stringify(data));
      }
      
     else{
      res.write("<h1>Hi Man, Get Request</>");
      }

     res.end();
   }

/////////// 2-Create New Product/////////////////
  if(req.method ==="POST" && url === "/products"){  
    var body = '';

    //Get The Body Data
    req.on('data', function (chunk) {
       console.log(data);
        body += chunk.toString();
    })
    //Create The New Product
    req.on('end', () => {
      res.setHeader('Content-Type', "application/json");
      res.writeHead(201);

      //Make Simple Validation 
      let data = JSON.parse(body);
      const {title, price,description,categoryId,images} = body;
      let valid = userSchema.validateSync(data,{
        strict:true
      });

      //Get Product Id
     /*  let product_id =  fetch("https://api.escuelajs.co/api/v1/products");
                        .then(response.json()); */
      if(valid){
         console.log(valid);
         let data = {id: new Date() + 1,
         title:"New Product",
         price:1000,
         description:"A description",
         images:["https://placeimg.com/640/480/any"],
         creationAt:new Date(),
         updatedAt:new Date(),
         category:{"id":1,"name":"nuevo","image":"https://picsum.photos/640/640?r=1315",
         creationAt:new Date(),
         updatedAt:new Date()}}


         const response =  fetch('https://api.escuelajs.co/api/v1/products/', {
          method: "POST", 
          mode: "cors", // no-cors, *cors, same-origin
         
          headers: {
            "Content-Type": "application/json",
          },
        
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        }).then(res => res.json())
          .then(res.end(JSON.stringify(data)));

       
          
      }
      else{
        res.writeHead(400);
         res.end("Invalid Request");
      }
      
      
    })
    
  }

})

server.listen(8000,() => {
    console.log("Server is Running now on port 8000");
})