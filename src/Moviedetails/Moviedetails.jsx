import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

const Moviedetails = () => {

 let { movieId } = useParams(); //el variable eli fe el path



 let [movieObject, setMovies] = useState({});


 async function getMoviedeatails(id) {

  let { data } = await axios.get('https://api.themoviedb.org/3/movie/' + id + '?api_key=afed2bdc759c185496dcd94a60b71d77&language=en-US')


  console.log(data);

  setMovies(data);

 }



 useEffect(() => {

  getMoviedeatails(movieId);
 }, [])



 return (
  <div className='container'>
   <div className="row">
    <div className='col-md-4'>
     <div>
      <img src={`https://image.tmdb.org/t/p/w500${movieObject.poster_path}`} alt="" />
     </div>
    </div>
   </div>

  </div>
 );
}

export default Moviedetails;




// authontication + sass + xd