import { error } from 'console';
import http from 'http';

const convertRate = (data, rate) => {  
    data.forEach(elem =>{
   elem.price = elem.price * rate;
  } 
  )
  return data;
}

const categorizedData = (data) => {
   let categories = [];
   for(let elem of data){
    
    let obj = {
        id: elem.category.id,
        name: elem.category.name,
        image: elem.category.image
    }
    if(categories.find(categ => categ.id === obj.id));
    else{
           categories.push(obj);
   }
    }
    

    //Sorting the Categories in Ascending Order
    for (let i = 0; i < categories.length; ++i){
        for(let j = 0; j < categories.length - 1; ++j){
            if(categories[j].id > categories[j+1].id){
                let temp = categories[j];
                categories[j] = categories[j+1];
                categories[j+1] = temp;
            }
        }
    }
  
// Add Products to its own category
  let newData = [];
  for(let i = 0; i < categories.length; ++i ){
    //debugger;
    let category = categories[i];
    let products = [];
    for(let j = 0; j < data.length; ++j){
       let obj = data[j];
       const {id,title,description,price} = obj;
       let product = {id,title,description,price};
        if(obj.category.id === category.id){
            products.push(product);
           newData[i] = {category: category, products: products};
        }

    }
  }
  return newData;
}
async function getProductsData () {
  let response = await fetch("https://api.escuelajs.co/api/v1/products");
   response = await response.json();

 //convertPriceRate
 let rate = 30;
 let data = convertRate(response, rate);

  console.log(data);
  // List the Categories
  let newData = categorizedData(data);
  
 console.log(newData);

}

getProductsData();

const server = http.createServer((req,res) => {
    let data = []
   if(req.method === "GET"){
   // console.log("Get Request");
     let url = req.url
     res.setHeader('Content-Type', "application/json");
     res.writeHead(200);
     res.write("<h1>Hi Man, Get Request</>");
     res.end();
   }

   if(req.method ==="POST"){
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    })
    req.on('end', () => {
    const product = JSON.parse(chunks.toString());
    res.setHeader('Content-Type', "application/json");
    res.writeHead(201);
    res.write(JSON.stringify(product));
    res.end();
    })
    req.on("error", () => {
        console.log(error);
    })
    
     
   }
})

server.listen(8000,() => {
    console.log("Server is Running now on port 8000");
})