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


 async function getRate() {
    let myHeaders = new Headers();
    myHeaders.append("apikey", "Rp04chiYjw1up5g8tkrKuf3n8ZG87eHt");

    var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
    };
   let rate = 0
    try{
    let response = await fetch("https://api.apilayer.com/exchangerates_data/convert?to=EGP&from=USD&amount=20", requestOptions)
    response = await response.json();
    console.log(response);
    rate = parseFloat(response.info.rate);
    
    }

    catch{
        error => console.log('error', error);
    }
    return rate;
}


export async function getProductsData () {
   let response = await fetch("https://api.escuelajs.co/api/v1/products");
    response = await response.json();

  //convertPriceRate
  let rate = await getRate();
  console.log(rate);
  let data = convertRate(response, rate);

  // console.log(data);
   // List the Categories
   let newData = categorizedData(data);
   
  console.log(newData);
  return newData;

}

getProductsData();

 
