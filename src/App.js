import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar/Navbar';
import Layout from './Layout/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home/Home';
import Register from './Register/Register';
import Login from './Login/Login';
import Movies from './Movies/Movies';
import TvShow from './TvShow/TvShow';
import People from './People/People';
import About from './About/About';
import Moviedetails from './Moviedetails/Moviedetails';
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import Protectedroute from './Protectedroute/Protectedroute';





function App() {

  let [isLogin, setIsLogin] = useState(false);

  let [userName, setuserName] = useState('')


  const routs = createBrowserRouter([
    {
      path: '/', element: <Layout userName={userName} isLogin={isLogin} setIsLogin={setIsLogin} />, children: [

        { index: true, element: <Register /> },

        { path: 'home', element: <Protectedroute>   <Home />   </Protectedroute> },

        { path: 'moviedetails/:movieId/:movieName', element: <Protectedroute>    <Moviedetails />  </Protectedroute> },


        { path: 'login', element: <Login setIsLogin={setIsLogin} /> },

        {
          path: 'movies', element: <Protectedroute> <Movies /> </Protectedroute>
        },
        {
          path: 'tv', element: <Protectedroute> <TvShow />  </Protectedroute>
        },


        { path: 'people', element: <Protectedroute> <People />   </Protectedroute> },
        { path: 'about', element: <Protectedroute>  <About />   </Protectedroute> },



        { path: '*', element: <h1>404 notFound</h1> },

      ]
    }



  ])

  useEffect(() => {

    if (localStorage.getItem('token')) { //fe 7ad 3ml login

      let token = localStorage.getItem('token');
      let userdata = jwtDecode(token);
      console.log(userdata)

      setuserName(userdata.first_name);
      setIsLogin(true); //elnavbar hyfdl mfto7

    }
  }, [isLogin])










  return (
    <>
      <RouterProvider router={routs} />

    </>

  );
}

export default App;
