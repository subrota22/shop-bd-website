import { HomeIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { NavLink, useLoaderData } from 'react-router-dom';
import {  deleteShoppingCart, removeFromDb } from '../addToDb/addToDb';
import Cart from '../Cart/Cart';
import Review from '../Review/Review';
import "./Orders.css" ;
const Orders = () => {
const {intialCart } = useLoaderData() ;
console.log(intialCart);
const [cart , setCart] = useState(intialCart) ;
const clearCart = () => {
    setCart([]) ;
    deleteShoppingCart() ;
    }
const removeHandleById = (id) => {
const remainingData = cart.filter(productId => productId._id !== id )  ;
setCart(remainingData) ;
removeFromDb(id)
 }
    return (
        <div>
            <div className="orders-container">
                <div className="products-container">
           {
            cart.map(product => <Review key={product._id } product={product} 
                removeHandleById={removeHandleById}></Review> )
           }
                </div>
                <div className="cart-container">
                      {
                        <Cart cart={cart}  clearCart={clearCart}> 
                               <NavLink to="/" >
        <HomeIcon className="h-25  w-25 mx-auto text-blue-500"/>
        </NavLink>
                         </Cart>
                        
                        }
                </div>
            </div>
            <div>
{
    cart.length === 0 && <h2> No item found  <NavLink to="/"> Shop more</NavLink></h2>
}

            </div>
        </div>
    );
};

export default Orders;