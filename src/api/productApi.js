import axios from 'axios';

// DummyJSON URL
const URL = 'https://dummyjson.com/products';

// GET Produucts
export const getProducts = async ()=>{
    try{
        const res = await axios.get(URL);
        return res.data.products;
    }
    catch(err){
        console.log(err);
    }
}

// Add Product
export const addProduct = async (product)=>{
    try{
        const res = await axios.post(`${URL}/add`, product);
        return res.data;
    }
    catch(err){
        console.log(err);
    }
}

// Delete product
export const deleteProduct = async (id)=>{
    try{
        const res = await axios.delete(`${URL}/${id}`);
        return res;
    }
    catch(err){
        console.log(err);
    }
}