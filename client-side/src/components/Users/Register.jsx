import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import { getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import {BsEyeFill} from "react-icons/bs" ;
import {FiEyeOff} from "react-icons/fi" ;
import { NavLink, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2';
import { AuthProvider } from '../../UserContexts/UserContexts';
import app from '../firebase.init/firebase.init';
import { authToken } from '../authToken/authToken';
const auth = getAuth(app) ;
const Register = () => {
const {registerUser} = React.useContext(AuthProvider) ;
const [errorMessage , setErrorMessage] = useState('') ;
const [success , setSuccess] = useState('') ;
const [show , setShow] = useState(true) ;
const navgiate = useNavigate() ;
const formHandelar = (e) => {
    e.preventDefault() ;
    const form = e.target; 
    const name = e.target.name.value ;
    const password = e.target.password.value ;
    const email = e.target.email.value ;
    const number = e.target.number.value ;
    //check password 
    const formatUpperCase = /[A-Z]/.test(password);
    const formatInteger = /[0-9]/.test(password);
    const specialCharacter = /(?=.*[!@#$&*])/.test(password); 
  

    if(!formatInteger) {
      setErrorMessage("") ;
      setSuccess("")
      setErrorMessage("Insert one or two integer  like  7 , 5 , 4") ;
       return ;
     } 
     
  if(!formatUpperCase) {
    setErrorMessage("") ;
    setSuccess("")
   setErrorMessage("Insert one or two upper case like A , X , G") ;
    return ;
  } 
    
  if(!specialCharacter) {
    setErrorMessage("") ;
    setSuccess("")
    setErrorMessage("Insert one or two special charecter like # , % , @ ") ;
     return ;
   } 
    if(password.length <= 9 || password.length >= 20){
      setErrorMessage("") ;
      setErrorMessage("Insert your password between 10 to 20 ") ;
      return ;
    }

  registerUser(email, password  )
  .then((userCredential) => {
    const user = userCredential.user;
    authToken(user.email) ;
    setSuccess("") ;
    setSuccess("")
    setSuccess("You have successfully register !! ") ;
    Swal.fire(
      'God job!',
      'Register successfully done !',
      'success'
    ) ;
    
 navgiate("/login") ;
    emailVerify() ;
    addMoreInfo(name , number) ;
    form.reset() ;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMsg = error.message;
    setErrorMessage("") ;
    setSuccess("")
    setErrorMessage(errorCode ) ;
    setErrorMessage(errorMsg + "please log in now !!") ;
    Swal.fire(
      'Bad job!',
      'Register   fialed  already have an account please log in  now !!',
      'error'
    )
    // ..
  });

  const emailVerify = () => {
    //email verification 
    sendEmailVerification (auth.currentUser)
    .then(() => {
     setSuccess("")
     setErrorMessage("") ;
     setSuccess("Check your inbox or spam to verify your email ") ;
  
    });
}
}

const addMoreInfo = (name , number ) => {
  updateProfile(auth.currentUser, {
    displayName:  name,  
    photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2orMuOIxBwwzAi9b_Ydvv9oCEggp3R7GZTQOttpw&s" ,
    phoneNumber:number , 
  }).then(() => {
    // Profile updated!
    // ...
  }).catch((error) => {
  setErrorMessage(error.message) ;
  });
  
}

const handleShow = () => {
  setShow(false)
}

const handleHide =() => {
  setShow(true) ;
}
//

// const user = auth.currentUser;
// if (user !== null) {
//   // The user object has basic properties such as display name, email, etc.
//   const displayName = user.displayName;
//   const email = user.email;
//   const photoURL = user.photoURL;
//   const emailVerified = user.emailVerified;

//   // The user's ID, unique to the Firebase project. Do NOT use
//   // this value to authenticate with your backend server, if
//   // you have one. Use User.getToken() instead.
//   const uid = user.uid;
// }

const user = auth.currentUser;

if (user !== null) {
  user.providerData.forEach((profile) => {
    const {providerId , uid , displayName , email , photoURL , phoneNumber} = profile ;
    <DisplayUser providerId={providerId} uid={uid} displayName={displayName}
    email={email} photoURL={photoURL} phoneNumber ={phoneNumber}
    > </DisplayUser>
  });
}
    return (
        <div>
    <Form className='was-validated w-50 mx-auto my-5 bg-dark p-4 rounded text-white' onSubmit={formHandelar}>


<Form.Group className="mb-3" controlId="formBasicName">
      <Form.Label>Name</Form.Label>
        <Form.Control type="text"  name="name" placeholder="Enter your name"  required={true}/>
        <Form.Text className="text-muted">
          We'll never share your name with anyone else.
        </Form.Text>

        </Form.Group>

        
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter email"  required={true}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
      <Form.Label>Phone number </Form.Label>
        <Form.Control type="text"  name="number" placeholder="Enter your phone number"  required={true}/>
        <Form.Text className="text-muted">
          We'll never share your phone number with anyone else.
        </Form.Text>

        </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
      {
        show ?   <span onClick={handleShow} className="fs-4 text-info fw-bold ">  <FiEyeOff/>
          </span> :
        <span className='text-primary fs-4 fw-bold ' onClick={handleHide}> <BsEyeFill/> </span>
      }
        <Form.Control type={show ? "password" : "text"} name="password" placeholder="Password"  required={true}/>
      </Form.Group>
      {
  errorMessage  ? 
  <div className="my-3 mx-auto">
  <p className="text-center alert alert-danger"> { errorMessage} </p>
  </div>
  : undefined 
}
{
       success ? 
           <div className="my-3 mx-auto">
           <p className="text-center alert alert-success"> { success} </p>
           </div> : undefined 
}

      <Form.Group className="mb-3 d-flex" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" required={true}/>
      </Form.Group>
   <div className="d-flex justify-content-center">
   <Button variant="primary" className='w-50 py-2 px-3 fs-5 ms-5'  type="submit">
       Register
      </Button>
   </div>
      <div className="d-flex justify-content-center">
        
        <p>Please log in now !! </p>
          <small className='mx-4'>
              <NavLink to="/login">  Login  </NavLink>
          </small>
        </div>
    </Form>
    <br />
</div>
    );
};


const DisplayUser = ({providerId , uid , displayName , email , photoURL , phoneNumber}) => {
  <Table striped bordered hover>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Phone number </th>
      <th>Provider id </th>
      <th>Uid</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>{displayName} </td>
      <td>{email} </td>
      <td>{phoneNumber} </td>
      <td>{providerId}</td>
      <td>{uid} </td>
      <td> 
        <img src={photoURL} alt="user" className='w-20 h-25 rounded-circle' />
      </td>
    </tr>
  </tbody>
</Table>
}

export default Register;