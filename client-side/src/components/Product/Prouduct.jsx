
import "./Product.css" ;
import {BsCartFill} from "react-icons/bs" ;;
const Prouduct = ({product , handleOnClick}) => {
const {img , name , price , quantity ,ratings ,ratingsCount , seller , shipping } = product ;

    return (
        <div className='products'  data-aos="zoom-in">
       <img src={img ? img : "https://i.ibb.co/7nNB7L7/images.jpg"} alt="productImage" id='productImage'/>
       <div className="product-text">
        <p>Product Name : {name} </p>
        <p>Price : {price?price:0} </p>
        <p> Quantity : {quantity?quantity:0} </p>
        <p> Ratings : {ratings?ratings:0} </p>
        <p> Ratings count : {ratingsCount?ratingsCount:0} </p>
        <p> Seller : {seller?seller:"seller not found"} </p>
        <p> Shipping : {shipping ? shipping: 0} </p>
       </div>
       <button className='cart-button' onClick={() => (handleOnClick(product)) }> 
       <span style={{margin:"0px 8px"}}>Add to cart</span> <BsCartFill/> 
       </button>
        </div>
    );
};

export default Prouduct;