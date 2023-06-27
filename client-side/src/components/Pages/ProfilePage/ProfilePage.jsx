import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthProvider } from '../../../UserContexts/UserContexts';

const ProfilePage = () => {
const {user  ,logOutUser } = React.useContext(AuthProvider) ;
const navigate = useNavigate() ;
const logOut = () => {
logOutUser()
.then(() => {
alert("Your profile has been log out !! ") ;
navigate("/login") ;
})
.catch((error) =>{
console.log(error);
})
}
useEffect(() => {
  fetch(`http://localhost:3032/json-webtoken` , {
  headers:{
  'content-type' : 'application/json' ,
    authorization: `Bearer ${localStorage.getItem('shop-bd-token')}`
  }
  })
  .then(res =>{
  if(res.status===401 || res.status===403) {
   navigate("/login") ;
   return logOutUser() ;
  }
  return res.json()
} )
  .then(data => console.log(data))
  .catch(error => console.log(error))
} , [logOutUser , navigate]) 
return (
<>
{
user.uid && 
<div className="card text-center rounded" style= {{width: "25rem" , margin:"25px 34%" }}>
<img src={user.photoURL ? user.photoURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlfqSnSbAtykXiTj4HBLzfdYgZF5P8Po1Bj4Cg8eGpqQ&s"} alt="user profile" classNameName='img-fluid rounded-circle mx-5'/>
  <div className="card-body">
    <p className="card-title">{user.displayName ? user.displayName : "name not found"}</p>
    <p className="card-title">{user.email ? user.email : "email not found"}</p>
    <p className="card-text">Email status : {user.emailVerified ? 
    <p className='text-success'> Email is verified </p> :
    <p className='text-danger'> Email is not verified </p> 
    }</p>
    <button className="btn btn-danger py-2 px-2 w-50" onClick={logOut}> Log out </button>
  </div>
</div> }
</>

    );
};

export default ProfilePage;