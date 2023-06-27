import React, { useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth" ;
import app from '../components/firebase.init/firebase.init';
const auth = getAuth(app) ;
export const AuthProvider = React.createContext() ;
const UserContexts = ({children}) => {
const [loading , setLoading] = useState(true) ;
const [user , setUser] = useState({}) ;
//register user 
const registerUser = (email , password) => {
return createUserWithEmailAndPassword(auth , email , password) ;
}
//log in user 
const loginUser = (email , password) => {
setLoading(true) ;
return signInWithEmailAndPassword(auth , email , password) ;
}
//user information
useEffect(() => {
const unSubscribe =  onAuthStateChanged(auth , (userinfo) => {
if(userinfo) {
setUser(userinfo) ;
}
setLoading(false) ;
})
return () => {
unSubscribe() ; //mounting and unmounting or update check 
}
} , [])
const logOutUser = () => {
return auth.signOut() ;
}
const authInfo = {user ,  registerUser ,  loginUser , loading , setLoading , logOutUser }
return (
<React.Fragment>
<AuthProvider.Provider value={authInfo}>
{children}
</AuthProvider.Provider>
</React.Fragment>
);
};

export default UserContexts;