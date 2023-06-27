
import React from 'react';
import "./Cart.css" ;
const Cart = ({cart , clearCart , children}) => {
let quantity = 0 ;
let price = 0 ;
let tax = 0 ;
let shippingPrice = 0 ;
let totalAmount = 0 ;

for(let product of cart) {
quantity = quantity + product.quantity ;
price = price + product.price * quantity ;
tax =  totalAmount * 0.2 ;
shippingPrice = shippingPrice +  product.shipping ;
totalAmount =  (price + tax + shippingPrice) ;
}


 return (
<div className='cart-info'>
   <h2> Product summery </h2>
   <hr id='hr'/>
   <p> Selected item : {quantity?quantity:0}</p>
   <p> Price ${parseFloat(price?price:0).toFixed(2)}</p>
   <p> Tax ${(tax?tax:0).toFixed(2)}</p>
   <p> Shipping price ${parseFloat(shippingPrice?shippingPrice:0).toFixed(2)}</p>
   <p>Grand total : ${parseFloat(totalAmount?totalAmount:0).toFixed(2)}</p>
   <button className='cartClear' onClick={ clearCart}> Claer Cart </button>
   {children}
        </div>
    );
};

export default Cart;