import { categories } from "../controllers/categoryController.js";
export const validateProduct = (name, price, category_id) => {
    const errors = [];
    if( typeof name !== "string" || name.length < 3 ){
        errors.push("Name must be a string with at least 3 charcters");
    }

    if( typeof price !== "number" ){
        errors.push("Price must be a number");
    }

    if( typeof price !== "number" ){
        errors.push("Price must be a number");
    }
    if(categories.findIndex(category => category === category_id) === -1){
        errors.push("category_id Must be an existing in categories");
    }
    return errors;
}