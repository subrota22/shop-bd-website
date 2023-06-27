  import { getAuth , onAuthStateChanged, sendPasswordResetEmail , signOut } from 'firebase/auth';
  import Swal from 'sweetalert2';
  import React, { useEffect, useState } from 'react';
  import Button from 'react-bootstrap/Button';
  import Form from 'react-bootstrap/Form';
  import { NavLink, useLocation, useNavigate  } from 'react-router-dom';
  import "./UserLogin.css";
  import { Typewriter } from 'react-simple-typewriter'
  import {BsEyeFill} from "react-icons/bs" ;
  import {FiEyeOff} from "react-icons/fi" ;
  import app from '../firebase.init/firebase.init';
  import { AuthProvider } from '../../UserContexts/UserContexts';
import { authToken } from '../authToken/authToken';

  const auth = getAuth(app) ;
  const UserLogin = () => {
  const location = useLocation() ;
  const from = location?.state?.from?.pathname || '/' ; //get current path 
  const navigate = useNavigate() ;
  const {loginUser} = React.useContext(AuthProvider) ;
  const [show , setShow] = useState(true) ;
  const [errorMessage , setErrorMessage] = useState('') ;
  const [success , setSuccess] = useState('') ;
  const [getEmail , setEmail] = useState('') ;
  const [user , setUser] = useState({}) ; 

  useEffect(() => {
  onAuthStateChanged(auth , (userInfo) => {
  if(userInfo) {
  setUser(userInfo) ;
  }
  })
  } ,[])

  const formHandelar = (e) => {
  e.preventDefault() ;
  const password = e.target.password.value ;
  const email = e.target.email.value ;
  loginUser(email , password) //------------------>
  .then(result => {
  const userInfo = result.user ;

  setUser(userInfo);
  setSuccess("You have successfully loged in !! ") ;
  authToken(result.user.email) ;
  Swal.fire(
  'Good job!',
  'Log in successfully done !',
  'success'
  ).catch((error) => {
  console.error("Sunar issue" + error);
  //Ranimukharji12@#
  })
  navigate(from , {replace:true}) ;
  }).catch((error) => {
  console.log("You have an error : " , error);
  const errorMsg = error.message;
  setErrorMessage(errorMsg ) ;
  Swal.fire(
  'Bad job!',
  'Log in fialed register first !',
  'error'
  )
  })
  }
  //
  const resetPassword = () => {
  if(getEmail==="") {
  Swal.fire({
  icon:"info" ,
  text:"Please enter your email to reset your password . " ,
  timer:7000 ,
  })
  }
  sendPasswordResetEmail(auth , getEmail) 
  .then(result => {
  setSuccess("") ;
  setSuccess("Check your spam or inbox to reset your password !!  ")

  }).catch((error) => {
  setErrorMessage(error.message) ;
  })
  }

  const emailHandle = (e) => {
  const email = e.target.value ;
  setEmail(email) ;
  }

  const handleShow = () => {
  setShow(false)
  }

  const handleHide =() => {
  setShow(true) ;
  }
  //log out 
  const handleLogOut = () => {
  signOut(auth)
  .then(result => {
  setUser({}) ; 
  Swal.fire({
  icon: "success" ,
  title:"Log out successfull" ,
  timer:1500 , 
  })
  })
  }
  //get user info 

  return (
  <div>

  <div className="text-white fs-2 fw-bold">
  <p className='text-primary'> Log in with  </p>
  <Typewriter
  words={['Google', 'GitHub', 'Facebook', 'Email and password ' , 'by using this form' 
  , 'Start now !']}
  loop={Infinity}
  cursor
  cursorStyle='_'
  typeSpeed={100}
  deleteSpeed={80}
  delaySpeed={2000}
  />
  </div>
  <div>
  {
  user.uid ? 
  <div className='userInfoDiv text-white'>  
  <img src={user.photoURL ? user.photoURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC4FyRNsCnTR8vps_MdI83EILCgNT_15ZL-K1sqKDFJl2l4cEi7FRKFNKTJpjhJy0Ie3k&usqp=CAU"} alt="user" className='w-25 h-25 rounded-circle'/>
  <p>Name : {user.displayName ? user.displayName :  "not found" } </p>
  <p>Email : {user.email ? user.email :  "not found"} </p>
  <p>PhNumber : {user.phoneNumber ? user.phoneNumber : "not found" } </p>
  <button className="py-2 mx-2 w-50 btn btn-danger" onClick={handleLogOut}>Log out</button>
  </div> 
  :
  undefined 
  }
  </div>

  <Form className='was-validated loginForm mx-auto my-5 bg-dark text-white rounded p-4' onSubmit={formHandelar}>
  {
  errorMessage || success ? 
  <div className="my-3 mx-auto">
  {
  errorMessage ?   <p className="text-center alert alert-danger"> { errorMessage} </p> : undefined
  }
  {
  success ? <p className="text-center  alert alert-success"> {success}  </p>  : undefined
  }

  </div>
  : undefined 
  }

  <Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label>Email address</Form.Label>
  <Form.Control type="email" onBlur={emailHandle} name="email" placeholder="Enter email"  required={true}/>
  <Form.Text className="text-muted">
  We'll never share your email with anyone else.
  </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
  <div className="d-flex flex-row justify-content-lg-between">
  <Form.Label>Password</Form.Label>
  {
  show ?   <span onClick={handleShow} className="fs-4 text-info fw-bold cursor">  <BsEyeFill/>
  </span> :
  <span className='text-primary fs-4 fw-bold cursor' onClick={handleHide}> <FiEyeOff/>  </span>
  }
  </div>
  <Form.Control type={show ? "password" : "text"} name="password" placeholder="Password"  required={true}/>
  </Form.Group>
  <Form.Group className="mb-3 d-flex " controlId="formBasicCheckbox">
  <Form.Check type="checkbox" label="Check me out" required={true}/>
  </Form.Group>
  <Button variant="primary" className='w-50 py-2 px-3 fs-5'  type="submit">
  Log in 
  </Button>
  <div className="d-flex justify-content-center">

  <p>Please regiser  for an account please login </p>
  <small className='mx-3'>
  <NavLink to="/register">  Register  </NavLink>
  </small>
  </div>
  <div>
  <p>If yo forgot password  please reset now</p>
  <small>
  <button className='btn btn-success' onClick={resetPassword}>  Reset password  </button>
  </small>
  </div>
  </Form>

  </div>
  );

  }
  export default UserLogin ;