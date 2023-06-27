import React from 'react';
import "./Review.css" ;
import { TrashIcon} from '@heroicons/react/24/outline'
const Review = ({product , removeHandleById }) => {
const {name , price , quantity , img , _id} = product ;
console.log("bundu suna chan");
    return (
        <div>
       <div className="cart-details-info">
       <div className="image-div">
           <img src={img} alt=""  className='ProductImage' />
           </div>
       <div className="text-div">
            <p> {name} </p>
            <p> Price  : ${price} </p>
            <p>Shipping Charge : ${quantity} </p>
       </div>

       <div className="delete">
        <button id='deleteButton' onClick={() => removeHandleById(_id)}>
        <TrashIcon className="h-6 w-6 text-blue-500"/>
        </button>
       </div>

       </div>
    
        </div>
    );
};

export default Review;