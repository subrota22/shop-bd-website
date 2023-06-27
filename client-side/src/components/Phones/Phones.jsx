
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import styles from  "./Phones.module.css" ;
import Phone from  "./Phone" ;
const Phones = () => {
const getPhoneData = useLoaderData() ;
const phones = getPhoneData.data ;
    return (
     <React.Fragment>
        <h2 className='text-white bg-info m-0 text-center py-5 font-bold'> I have got {phones.length} phones data </h2>
        <div className={styles.phones}>
    
            {
                phones.map((phone , i ) =>  <Phone  key={i} phone={phone}></Phone>)  
            }
        </div>
     </React.Fragment>
    );
};

export default Phones;