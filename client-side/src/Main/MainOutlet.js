import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

const MainOutlet = () => {
    return (
        <div>
           <Header></Header> 
           <Outlet></Outlet>
        </div>
    );
};

export default MainOutlet;