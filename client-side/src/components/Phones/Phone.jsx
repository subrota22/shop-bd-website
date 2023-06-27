import React from 'react';
import styles  from "./Phone.module.css" ;
const Phone = ({phone}) => {
const {phone_name , slug ,brand , image} = phone ;
    return (
        <div className={styles.phoneDiv}>
         <img src={image ? image : "https://cdn.shopify.com/s/files/1/0551/6227/3942/products/BlueiPhone13ProMax.jpg?v=1664311772&width=493"} alt="phone" className={styles.phoneImage} />
          <p> Brand  : {brand} </p>  
          <p> Phone name   : {phone_name} </p>
          <p> Slug  : ${slug} </p>   
        </div>
    );
};

export default Phone;