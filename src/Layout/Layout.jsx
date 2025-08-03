import React from 'react';
import Navbar from './../Navbar/Navbar';

import { Outlet } from 'react-router-dom'

const Layout = (props) => {
 return (
  <>
   <Navbar userName={props.userName} isLogin={props.isLogin} setIsLogin={props.setIsLogin}  />
   <Outlet />


  </>
 );
}

export default Layout;
