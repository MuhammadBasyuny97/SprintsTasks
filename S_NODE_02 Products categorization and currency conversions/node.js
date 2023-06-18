
async function getProductsData () {
   const response = await fetch("https://api.escuelajs.co/api/v1/products");
   const data = await response.json();
   //console.log(data);


   // List the Categories
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
       const {id,title,description,image} = obj;
       let product = {id,title,description,image};
        if(obj.category.id === category.id){
            products.push(product);
           newData[i] = {category: category, products: products};
        }

    }
  }
  console.log(newData);

}

getProductsData();