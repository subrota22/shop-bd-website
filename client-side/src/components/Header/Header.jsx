import React from 'react';
import "./Header.css" ;
import logo from "../../images/Logo.svg" ;
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import {MdDarkMode} from "react-icons/md";
import {BsBrightnessHigh} from "react-icons/bs" ;
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import Swal from 'sweetalert2';
import app from '../firebase.init/firebase.init';
const auth = getAuth(app) ;
const Header = () => {
const [theme , setTheme] = useState("lightTheme") ;
const [user , setUser] = useState({}) ;

useEffect(() => {
document.body.className =  theme ;
} , [theme]) ;

useEffect(() => {
//useEffect will recive local or firebase data 
onAuthStateChanged(auth , (userInfo) => { //auth , userInfo check if user is present //
if(userInfo) { //if user present 
setUser(userInfo) ;
}
})
}, [])
const changeTheme = () => {
    if(theme==="lightTheme") {
     setTheme("darkTheme") ;
     }else{
     setTheme("lightTheme") ;   
     } 
    }

    const activeStyle = {
        color:"lime"
        }

const logOutUser = () => {
signOut(auth)
.then( ()  => {
setUser({}) ;
window.location.reload(false) ;
Swal.fire({
icon:"success" ,
title:"Log out successfully done !!" ,
timer:2500 
})
})
}
        /*
        
        1/ index.css => lightThem , darkTheme 
        2/ header useState => lightTheme
        3/ useEffect => document.body.class = theme => [theme] 
        4/ click handelar => if light => set dark => else  => set light 
        5/ conditional redaring to show icon 

        */
    return (
        <div className='header'>
            <div>
                <img src={logo} alt="logo" className='logo'/>
            </div>
       {
        user.uid  &&    <>
        <NavLink to="/profile-page">
        <div>
        <img src={user.photoURL ? user.photoURL : "https://st4.depositphotos.com/5989284/20550/i/600/depositphotos_205505676-stock-photo-portrait-uncertain-young-stylish-stubble.jpg"} alt="user" className='rounded-circle img-fluid' style={{height:"68px"}}/>
        <p className='text-primary'>{user.displayName ? user.displayName : "name not found"} </p>
    </div>
        </NavLink>
        </>
       }
            <div className="linkDiv">
                <NavLink style ={({isActive}) => isActive ? activeStyle : undefined } to="/">
                 Home</NavLink>
                <NavLink  style ={({isActive}) => isActive ? activeStyle : undefined } to="/blog">Blog</NavLink>
                <NavLink style ={({isActive}) => isActive ? activeStyle : undefined } to="/contact">Contact</NavLink>
  
                <NavLink style ={({isActive}) => isActive ? activeStyle : undefined } to="/orders">Orders</NavLink>

                <NavLink style ={({isActive}) => isActive ? activeStyle : undefined } to="/phones">Phones</NavLink>

          {
            user.uid  ?
             <button className="btn btn-outline-danger mx-3 fs-5 fw-bolder" onClick={logOutUser}> Log out </button>
            :   <>
            <NavLink style ={({isActive}) => isActive ? activeStyle : undefined } to="/login">Login</NavLink>
       
       <NavLink style ={({isActive}) => isActive ? activeStyle : undefined } 
        to="/register">Register</NavLink>
       </> 
          }
{
    theme=== "lightTheme" ? 
                 <span className="btn-dark px-2 py-2 mx-2 cursor" onClick={ changeTheme}>
                    <MdDarkMode className='fs-3'/>
                 </span>
                 :
                 <span className="btn-dark px-2 py-2 mx-2 cursor" onClick={ changeTheme}>
                    <BsBrightnessHigh className='fs-3 text-white'/>
                 </span>
                 }
            </div>
        </div>
    );
};


export default Header;