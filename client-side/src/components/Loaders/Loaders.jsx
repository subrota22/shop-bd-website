import { getShoppingCart } from "../addToDb/addToDb";
export const MyLoaders = async () => {
 const porductData = await fetch("https://shop-bd.vercel.app/products") ;
 const productsData = await porductData.json() ;
const {products} = productsData ;
 const saveCartItem = getShoppingCart() ;
let intialCart = [] ;
for(const id  in saveCartItem) {
const addedProducts  = products.find(product => product._id === id) ;
   if(addedProducts) {
    let quantity = saveCartItem[id] ;
    addedProducts.quantity = quantity  ;
    intialCart.push(addedProducts) ;
   }
} 
 return {products:products  , intialCart : intialCart } ;
};
