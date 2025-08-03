import React from 'react';
import { Navigate } from 'react-router-dom';

const Protectedroute = (props) => {

 if (localStorage.getItem('token')) {
  //7ad 3aml login
  return props.children;

 } else {
  //law m7dsh 3aml login 

  //bdel el useNavigate by7sl automatic
  return <Navigate to={'/login'} />
 }

}

export default Protectedroute;



