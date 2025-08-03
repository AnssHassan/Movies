import React, { useState } from 'react';
import Joi from 'joi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {


 const [user, setUser] = useState({

  email: '',
  password: ''

 });

 const [errorsDetails, setErrors] = useState([]);


 const [apiMsg, setMsg] = useState('');

 let redirect = useNavigate();

 let myUser = { ...user };//male deep copy from state


 function showAlert(inputName) {
  let x = errorsDetails.filter((err) => { return err.message.includes(inputName) });
  console.log(x);
  if (x[0] !== undefined) {
   return <p className='text-danger'>{x[0].message}</p>
  }
  else {
   return "";
  }

 }

 function validateUserData() {
  let rules = Joi.object({


   email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).required()
   ,
   password: Joi.string().pattern(/^[A-Z]/).required()
  })


  //match or not 

  // let validationResult = rules.validate(user);//first error only
  let validationResult = rules.validate(user, { abortEarly: false });//all errors 

  console.log(validationResult);


  if (validationResult.error !== undefined) {
   //fe moshkla
   setErrors(validationResult.error.details); //redraw UI (call render again)


   showAlert();
   return false
  } else {
   //mfesh moshkla 7sl match 
   setErrors([]);

   return true;
  }

 }


 async function login() {

  if (validateUserData()) {
   let { data } = await axios.post('https://route-egypt-api.herokuapp.com/signin', user);

   console.log(data)

   setMsg(data.message)
   if (data.message === 'success') {

    props.setIsLogin(true); //make update in props of navbar so navabar rerender

    // re render >>>  setstate  && update in propes

    localStorage.setItem('token', data.token);

    // token >>>> data of login user encoded (mtshfra)
    redirect('/home');
   }

  }

 }

 return (
  <>
   <div className='container'>
    <h1>Login form</h1>



    <form onSubmit={(e) => {
     e.preventDefault();

     login();
    }}>



     <label>email:</label>
     <input type="text" onChange={
      (e) => {

       myUser.email = e.target.value;
       setUser(myUser);


      }} className='form-control mb-2' />

     {errorsDetails.length > 0 ? showAlert('email') : ''}


     <label>password:</label>
     <input type="text" onChange={
      (e) => {

       myUser.password = e.target.value;

       setUser(myUser);

      }} className='form-control mb-2' />


     {errorsDetails.length > 0 ? showAlert('password') : ''}

     <button className='btn btn-info'> Login</button>

     <h5 className='text-danger'>  {apiMsg} </h5>


    </form>

   </div>


  </>
 );
}

export default Login;






// authontication and authorization

// admin >> user