/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';





const Navbar = (props) => {
  console.log(props.isLogin);

  let redirectTo = useNavigate()



  function logOut() {

    redirectTo('/login');
    props.setIsLogin(false);
    localStorage.removeItem('token');

  }


  return (
    <nav className="navbar navbar-expand-md navbar-dark shadow  ">
      <div className="container">
        <a className="navbar-brand bg-danger">    {props.isLogin ? props.userName : ''}      </a>
        <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav me-auto mt-2 mt-lg-0">


            {!props.isLogin ? <>
              <li className="nav-item">
                <NavLink className={({ isActive }) =>
                  isActive ? "bg-danger    nav-link" : "nav-link"}
                  to="">register</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) =>
                  isActive ? "bg-danger    nav-link" : "nav-link"} to="login">login</NavLink>
              </li>
            </> : ''}



            {props.isLogin ? <> <li className="nav-item">
              <NavLink className={({ isActive }) =>
                isActive ? "bg-danger    nav-link" : "nav-link"} to="home">home</NavLink>
            </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) =>
                  isActive ? "bg-danger    nav-link" : "nav-link"} to="movies">movies</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) =>
                  isActive ? "bg-danger    nav-link" : "nav-link"} to="tv">tv show</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) =>
                  isActive ? "bg-danger    nav-link" : "nav-link"} to="people">people</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) =>
                  isActive ? "bg-danger    nav-link" : "nav-link "} to="about">about</NavLink>
              </li> </> : ''

            }


          </ul>




          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">

            <li className="nav-item">
              <NavLink >
                <input type="text" className='form-control mr-5' />
              </NavLink>
            </li>
            <li className="nav-item">
              <span className='nav-link mx-2'>
                <i className='fab fa-facebook-f'></i>

              </span>


            </li>
            <li className="nav-item">
              <span className='nav-link mx-2'>
                <i className='fab fa-twitter'></i>

              </span>
            </li>
            <li className="nav-item">
              <span className='nav-link mx-2'>
                <i className='fab fa-youtube'></i>

              </span>
            </li>

            <li className="nav-item">
              <span onClick={logOut} className='nav-link'>logout</span>
            </li>

          </ul>

        </div>
      </div>
    </nav>

  );
}

export default Navbar;
