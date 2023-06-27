import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from '../UserContexts/UserContexts';
import { BeatLoader } from 'react-spinners';
import "./PrivateRouter.css" ;
const PrivateRouter = ({children}) => {
const {user , loading} = React.useContext(AuthProvider) ;
const location = useLocation() ;
if(loading) {
return <div className="loader"><BeatLoader color='blue'></BeatLoader></div>
}
if(user && user.uid ) {
return children ; //if user true return children for component
}else{
return <Navigate to="/login" state={{from:location}} replace={false}></Navigate>
//state will be distructuring 
}
};

export default PrivateRouter;