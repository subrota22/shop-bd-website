import React, { useEffect, useState } from 'react';
import {  NavLink, useNavigate } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../addToDb/addToDb';
import Cart from '../Cart/Cart';
import {GrChapterPrevious , GrChapterNext } from  "react-icons/gr" ;
import HashLoader from 'react-spinners/HashLoader';
import Prouduct from '../Product/Prouduct';
import "./Shop.css" ;
import { AuthProvider } from '../../UserContexts/UserContexts';
const Shop = () => {
const [products , setProducts] = useState([]) ;
const [cart , setCart] = useState([]) ; 
const [count , setCount] = useState(0) ;
const [page , setPage] = useState(0) ;
const [pageSize , setPageSize] = useState(50) ; 
const pages = Math.ceil(count/pageSize) ;
const {logOutUser , user } = React.useContext(AuthProvider) ;
const [load , setLoad] = useState(true) ;
const  navigate = useNavigate() ;
useEffect(() => {
const url = `https://shop-bd-subrota22.vercel.app/products?page=${page}&size=${pageSize}` ;
fetch(url , {
headers:{
authorization:`Bearer ${localStorage.getItem('shop-bd-token')}`
}
})
.then(res => {
return res.json() ;
})
.then(data => {
setProducts(data.products) ; 
setCount(data.count) ;
setLoad(false) ;
})
.catch((error) => {
console.log(error);
})
} , [page , pageSize , navigate , logOutUser , user.email])
const clearCart = () => {
setCart([]) ;
deleteShoppingCart() ;
}
//data from local storage and api check 
useEffect(() => {
const getCartItem = getShoppingCart() ;
const storedCartIds = Object.keys(getCartItem) ;
let saveCartItem = [] ;
fetch(`https://shop-bd.vercel.app/productsById` , {
method:"POST" ,
headers:{
"content-type" : "application/json" 
},
body:JSON.stringify(storedCartIds) 
})
.then(res => res.json())
.then(data => {
for(let id in getCartItem) {
const addedProduct = data.find(cartProduct => cartProduct._id === id )  ;
//
if(addedProduct) {
const getCartQuantity= getCartItem[id] ;
addedProduct.quantity = getCartQuantity ; //api quantity will be chenged 
saveCartItem.push(addedProduct) ;
}
//
}
setCart(saveCartItem) ;
})
.catch((error) => {
console.error(" Check your sweet error carefully to fixed that error : " + error);
})

}, [products])
//handle onclick to pass or get data 
const handleOnClick = (selectedProduct) => {
//set token to the database  
fetch(`https://shop-bd.vercel.app/json-webtoken` , {
method:"POST" ,
headers:{
authorization : `Bearer ${localStorage.getItem("shopbd-token")}` , 
}
})
.then(res => res.json())
.then(data => data)
//check id inserted or not    
let cartCountUpdate = [] ;
const exist = cart.find(getProduct => getProduct._id === selectedProduct._id) ;
if(!exist) {
selectedProduct.quantity = 1 ;
cartCountUpdate = [...cart , selectedProduct] ;
} else {
const rest = cart.filter(getProduct => getProduct._id !== selectedProduct._id) ; 
exist.quantity = exist.quantity + 1 ;
cartCountUpdate = [...rest , exist] ;

}
setCart(cartCountUpdate) ;
addToDb(selectedProduct._id) ;

}


if (load) {
    return <>
        <div className='text-center' style={{ margin: "20% 45%" }}>
            <HashLoader color='blue'></HashLoader>
        </div>
    </>
}



return (
<div className='shopping-container'>
<>
<div className="product-container">
{
products.map(product => <Prouduct key={product._id}
handleOnClick={handleOnClick}  product={product}>
</Prouduct>)
}
</div> 

</>

<div className="cart-container">
<Cart cart={cart}  clearCart={clearCart}>

<NavLink to="/orders">
<button className='ordersReview'>  Order review   </button>
</NavLink>
</Cart>
</div>

<div className="text-center d-block">

{/* {
page  > parseInt(pageSize) &&
<button className='btn btn-danger mx-3 text-white fw-bold' onClick={() => setPage (page - 1) }>
<GrChapterPrevious> </GrChapterPrevious>       
</button>
} */}

{
page + 1  >= [...Array(pages).keys()].length &&
<button className='btn btn-danger mx-3 text-white fw-bold' onClick={() => setPage (page - 1) }>
<GrChapterPrevious> </GrChapterPrevious>       
</button>
}

{
[...Array(pages).keys()].map(pageNumber => 
<button  className={pageNumber === page ? 'btn btn-primary  mx-2 px-3 my-3' : 'btn btn-success mx-2' }
onClick={()=> setPage(pageNumber)}
>{pageNumber + 1 }</button>
)
}

{
//if page getter than , than it will be decreement else it will be increement
 [...Array(pages).keys()].length >  page + 1   &&
<button className='mx-3 btn btn-warning text-white' onClick={() => setPage ( page  +  1)}>        <GrChapterNext> </GrChapterNext>  
</button>
}


{/* page size set  */}
<select className='btn btn-info' onChange={(e)=>setPageSize(e.target.value)}>
<option value="10">10</option>
<option value="20">20</option>
<option value="50">50</option>
<option value="80">80</option>
<option value="100">100</option>
<option value="120">120</option>
<option value="140">140</option>
</select>


</div>
</div>
);
};

export default Shop;