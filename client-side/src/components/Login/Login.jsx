import React from 'react';
import "./Login.css" ;
import {FacebookAuthProvider, getAuth , GithubAuthProvider, GoogleAuthProvider , signInWithPopup , OAuthProvider  , signOut, TwitterAuthProvider, onAuthStateChanged} 
from  "firebase/auth" ;
import { useState } from 'react';
import Swal from "sweetalert2";
import UserLogin from '../Users/UserLogin';
import {FcGoogle} from "react-icons/fc" ;
import {BsGithub} from "react-icons/bs" ;
import {BsFacebook} from "react-icons/bs" ;
import {ImYahoo2} from "react-icons/im" ;
import {AiFillTwitterCircle} from "react-icons/ai" ;
import { useEffect } from 'react';
import HashLoader from "react-spinners/HashLoader";
import { useLocation, useNavigate } from 'react-router-dom';
import app from '../firebase.init/firebase.init';
import { AuthProvider } from '../../UserContexts/UserContexts';
import { authToken } from '../authToken/authToken';
const auth = getAuth(app) ;
const Login = () => {
const {setLoading} = React.useContext(AuthProvider) ;
const location = useLocation() ;
const from = location?.state?.from?.pathname || '/' ; //get current path 
const navigate = useNavigate() ;
const googleProvider = new GoogleAuthProvider() ;
const githubProvider = new GithubAuthProvider() ;
const facebookProvider = new FacebookAuthProvider() ;
const twitterProvider = new TwitterAuthProvider() ;
const yahooProvider = new OAuthProvider('yahoo.com');
const [user , setUser] = useState({}) ;
useEffect(() => {
onAuthStateChanged(auth , (userInfo) => {  //aut , checkUser 
if(userInfo) { //if user is preset 
setUser(userInfo) ;
}
})
} , [])
//
//google authentication
const logInWithGoogle = () => {
setLoading(true) ;
signInWithPopup(auth , googleProvider) 
.then(result => {
const userName = result.user ;
setUser(userName) ;
authToken(result.user.email) ;
navigate(from , {replace:true}) ;
}).catch((error) => {
console.error("Error:" , error);
Swal.fire({
icon: 'error',
title: 'Oops...',
text: 'Something went wrong you can not use same email for every authentication!',
footer: '<a href="/">Go back?</a>'
})
})
}
const logOutUser = () => {
signOut(auth) 
.then(() => {
setUser({})
window.location.reload(false) ;
navigate("/login") ;
}).catch((error ) => {
console.error("error=>" , error);
Swal.fire({
icon: 'error',
title: 'Oops...',
text: 'Something went wrong you can not use same email for every authentication!',
})
}) 
}

//git authentication 

const handleGitHubSignIn = () => {
setLoading(true) ;
signInWithPopup(auth , githubProvider )
.then(result => {
const user = result.user ;
setUser(user) ;
authToken(result.user.email) ;
navigate(from , {replace:true}) ;
}).catch((error) => {
console.error("Error " , error);
Swal.fire({
icon: 'error',
title: 'Oops...',
text: 'Something went wrong you can not use same email for every authentication!',
footer: '<a href="/">Go back?</a>'
})
})
}
//facebook 
const handleFacebookSignIn = () => {
setLoading(true) ;
signInWithPopup(auth , facebookProvider)
.then(result => {
const user = result.user ;
setUser(user) ;
authToken(result.user.email) ;
navigate(from , {replace:true}) ;
}).catch((error) => {
console.error("Error " , error);
Swal.fire({
icon: 'error',
title: 'Oops...',
text: 'Something went wrong you can not use same email for every authentication!',
footer: '<a href="/">Go back?</a>'
})
})
}
//yahoo!
const handleYahooSignIn = () => {
setLoading(true) ;
signInWithPopup(auth , yahooProvider)
.then(result => {
const user = result.user ;
setUser(user) ;
authToken(result.user.email) ;
navigate(from , {replace:true}) ;
}).catch(error => {
Swal.fire({
icon: 'error',
title: error.message ,
timer:2500 , 
})
})
}
//Twitter 
const handleTwiiterAuth = () => {
setLoading(true) ; //fetch data 
signInWithPopup(auth , twitterProvider)
.then(result => {
const userInfo  = result.user ;
setUser(userInfo) ;
Swal.fire({
icon: 'success',
title: 'Log in success with twitter ...',
timer:2500 , 
})
authToken(result.user.email) ;
navigate(from , {replace:true}) ;
}).catch(error => {
Swal.fire({
icon: 'error',
title: 'Oops...',
text: error.message,
})
}) ;
} ;

const [loader , setLoader] = useState(true) ;

useEffect(() => {
setTimeout(() => {
setLoader(false) ;
} , 2000)
} , [])
return (
<>
{

loader ? <HashLoader color="#36d7b7" className='loader'/> :

<div className='text-center my-5 loginDivStyle'>
{
user.uid || user.email ?
<div className='text-center userInfoDiv'> 

<h2 className='my-4 text-info'> Log in successfully done !! </h2>
<div className="card mx-auto my-2" style={{ width: "25rem"}}>
<img src={user.photoURL ? user.photoURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHQj0so97bfJrGrHzeHTL9-gDmbb3AS_u3xIXWeBUBoYOPFtryq1tCiV-ZmosISHymNwo&usqp=CAU"} className="card-img-top h-25" alt="user"/>
<div className="card-body">
<h5 className="card-title">Username : {user.displayName ? user.displayName : "name not found"}</h5>
<h5 className="card-title">Email:{user.email ? user.email : "email not found"}</h5>
<h5 className="card-title">User id: {user.uid? user.uid : "user id not found "}</h5>
<p className="card-text">Thanks to join with us we are  glad to meet with you !!</p>
<a href="/" className="btn btn-primary"> Go to shop </a>
</div>
</div> 
<button className='btn btn-danger py-2 w-50 px-2 fs-4'
onClick={() => logOutUser() } >Log out </button>
</div>
// else check 
:        
<div className='d-flex text-center flex-column justify-content-center loginButtoDiv m-auto w-25'>
<button className='btn btn-primary ms-4  py-2  w-75 fw-bold my-2'
onClick={ () => logInWithGoogle() }>
Log in with google <FcGoogle className='fs-3 mx-2'/>   </button> 
<button  onClick={ handleGitHubSignIn } 
className="btn w-75 btn-success my-2 mx-4 py-2">Log in with Github <BsGithub className='fs-3 mx-2'/> 
</button> 

<button  onClick={ handleFacebookSignIn } className="btn btn-primary w-75 my-2 mx-4 py-2">Log in with Facebook
<BsFacebook className='fs-3 mx-2 text-info' /> </button>
<button  onClick={ handleYahooSignIn } className="btn btn-info w-75 my-2 mx-4 py-2">Log in with Yahoo!
<ImYahoo2 className='fs-3 mx-2'  style={{color:"indigo"}}/>
</button>

<button  onClick={ handleTwiiterAuth } className="btn btn-success w-75 my-2 mx-4 py-2">Log in with twitter!
<AiFillTwitterCircle className='fs-3 mx-2 text-primary' />
</button>
</div>
}

<div className="loginUSerDiv">
<UserLogin></UserLogin>

</div>

</div>
}
</>
);
};


export default Login;