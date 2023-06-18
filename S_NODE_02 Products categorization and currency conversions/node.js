import fetch from 'node-fetch'

async function getProductsData () {
   const response = await fetch("https://api.escuelajs.co/api/v1/products");
   const data = await response.json();
   console.log(data);


   let categories = [];
   for(let elem of categories){
    
   }

   /*let map = new Map();

   for(let elem of data){
    debugger;
    //console.log(elem.category);
    let arr = [];
    let key = {};
    let value = {};
    const {id,title,price,description,image} = elem;
    key = elem.category;
    value ={id,title,price,description,image}; 
    if(map.key){
        arr = map.key;
        arr.push(value);
         map.key = arr;
    }
    else{
       map.key = arr.push(value);
    }
    
    
   }
  console.log(map);*/

}

getProductsData();