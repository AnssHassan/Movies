/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

const Movies = () => {
 let [moviesContainer, setMovies] = useState([]);

 async function getData(mediaType, setFun) {

  let { data } = await axios.get('https://api.themoviedb.org/3/trending/' + mediaType + '/day?api_key=afed2bdc759c185496dcd94a60b71d77&page=20');
  console.log(data.results);

  setFun(data.results);

 }


 useEffect(() => {
  getData('movie', setMovies);

 }, [])


 return (
  <div className="container">
   <div className="row">


    <div className="col-md-4">
     <div>
      <h1>trending <br /> movies <br /> to watch now</h1>
     </div>
    </div>

    {moviesContainer.map((movie) => {
     return <div key={movie.id} className='col-md-2'>
      <div className='position-relative'>


       <Link to={`/moviedetails/${movie.id}/${movie.title}`}>


        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className='w-100' />




       </Link>


       {/* moviedeatils/4122336 


ecommerce name/8547897897897897897987 >> dynamic routing */}



       <h5>{movie.title}</h5>
       <h5>{movie.id}</h5>

       <div className='rate position-absolute top-0 end-0 bg-danger py-4 px-2'>
        {Math.floor(movie.vote_average)}
       </div>

      </div>
     </div>
    })}

   </div>
  </div>
 );
}

export default Movies;
