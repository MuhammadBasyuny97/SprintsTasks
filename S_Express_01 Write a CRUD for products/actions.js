
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
    const {title,price,description,images,categoryId} = req.body;
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


export const updateProdcut =  (req,res) => {
    let id = req.params[0];
    let price = req.params[1];
    let title = req.params[2];
   
    let idx = products.findIndex(product => product.id === id);
    let product = products[idx];
     product.price = price;
     product.title = title;
    res.send(JSON.stringify(product));
}


export const deletProduct = (req,res) => {
    let id = req.params;
    let idx = products.findIndex(product => product.id === id);
    let product = products[idx];
    products.splice(idx,1);
    res.send(JSON.stringify(product));
}