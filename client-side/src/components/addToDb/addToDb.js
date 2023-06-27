

const addToDb = (id) => {
    const getData= localStorage.getItem("product-info") ;
    let productInfo = {} ;
    if(getData) {
    productInfo = JSON.parse(getData) ;
    } else{
       productInfo = {} ;
    }
    
    const quantity = productInfo[id] ;
    if(quantity) {
    let newQuantity = quantity + 1 ;
     productInfo[id]= newQuantity ;
    } else {
    productInfo[id] = 1 ;
    }
    
    localStorage.setItem("product-info" , JSON.stringify(productInfo)) ; 


    }
//check if added data is available//

    const getShoppingCart = () => {
        let productInfo = {} ;
        const cartStored = localStorage.getItem("product-info") ;
        if(cartStored) {
        productInfo = JSON.parse(cartStored)
        }
        return productInfo ;
    }

const removeFromDb = id =>{
    const storedCart = localStorage.getItem('product-info');
    if(storedCart){
        const shoppingCart = JSON.parse(storedCart);
        if(id in shoppingCart){
            delete shoppingCart[id];
            localStorage.setItem('product-info', JSON.stringify(shoppingCart));
        }
    }
}

const deleteShoppingCart =  () => {
    localStorage.removeItem("product-info")
    } 


    export {addToDb , getShoppingCart , removeFromDb , deleteShoppingCart}  ;