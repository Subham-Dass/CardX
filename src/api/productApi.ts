import axios from 'axios';

export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  thumbnail?: string;
}

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
export const addProduct = async (product:Product)=>{
    try{
        const res = await axios.post(`${URL}/add`, product);
        return res.data;
    }
    catch(err){
        console.log(err);
    }
}

// Delete product
export const deleteProduct = async (id:number|null)=>{
    try{
        const res = await axios.delete(`${URL}/${id}`);
        return res;
    }
    catch(err){
        console.log(err);
    }
}