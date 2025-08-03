import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Joi, { func } from 'joi';
import { useNavigate } from 'react-router-dom';


const Register = () => {

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    age: '',
    email: '',
    password: ''

  });

  const [errorsDetails, setErrors] = useState([]);


  const [apiMsg, setMsg] = useState('');

  let navigateTo = useNavigate();


  let myUser = { ...user };//male deep copy from state


  function validateUserData() {
    let rules = Joi.object({

      first_name: Joi.string().alphanum().min(3).max(15).required(),
      last_name: Joi.string().alphanum().min(3).max(15).required(),
      age: Joi.number().min(15).max(50).required(),
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



  async function register() {
    // ab3t el object ll api 

    // validate ll user eli bb3to

    //validateUserData()//boolean func

    if (validateUserData()) {
      let { data } = await axios.post('https://route-egypt-api.herokuapp.com/signup', user);

      console.log(data.message)

      setMsg(data.message)
      if (data.message === 'success') {

        // ektbli fo2 login
        navigateTo('/login');


      }



    }
    else {
      //wrene el errors
    }


  }


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




  return (
    <>
      <div className='container'>
        <h1>Registration form</h1>

        {/* {errorsDetails.map((error) => {
          if (error.message.includes('pattern')) {
            error.message = 'password must start with capital letter';
          }

          return <p className='text-danger'>{error.message}</p>
        })}
 */}



        <form onSubmit={(e) => {
          e.preventDefault();

          register();
        }}>


          <label>fisrt name:</label>

          <input type="text" onChange={(e) => {

            myUser.first_name = e.target.value; //make override in my instnace


            setUser(myUser);



          }} className='form-control mb-2' />

          {errorsDetails.length > 0 ? showAlert('first_name') : ''}

          <label>last name:</label>
          <input type="text" onChange={
            (e) => {

              myUser.last_name = e.target.value;

              setUser(myUser);


            }} className='form-control mb-2' />
          {errorsDetails.length > 0 ? showAlert('last_name') : ''}


          <label>age:</label>
          <input type="text" onChange={
            (e) => {

              myUser.age = e.target.value;
              setUser(myUser);




            }} className='form-control mb-2' />
          {errorsDetails.length > 0 ? showAlert('age') : ''}









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

          <button className='btn btn-info'> register</button>

          <h5 className='text-danger'>  {apiMsg} </h5>


        </form>

      </div>
    </>
  );
}

export default Register;
