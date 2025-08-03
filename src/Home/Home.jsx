/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Home = () => {

 let [moviesContainer, setMovies] = useState([]);
 let [tvContainer, setTv] = useState([]);
 let [personContainer, setPerson] = useState([]);


 async function getData(mediaType, setFun) {

  let { data } = await axios.get('https://api.themoviedb.org/3/trending/' + mediaType + '/day?api_key=afed2bdc759c185496dcd94a60b71d77');
  console.log(data.results);

  setFun(data.results);


 }


 useEffect(() => {
  getData('movie', setMovies);
  getData('tv', setTv);
  getData('person', setPerson);
 }, [])


 return (
  <>
   <div className="container">
    <div className="row">


     <div className="col-md-4">
      <div>
       <h1>trending <br /> movies <br /> to watch now</h1>
      </div>
     </div>

     {moviesContainer.slice(0, 10).map((movie) => {
      return <div key={movie.id} className='col-md-2'>
       <div className='position-relative'>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className='w-100' />
        <h5>{movie.title}</h5>
        <div className='rate position-absolute top-0 end-0 bg-danger py-4 px-2'>
         {Math.floor(movie.vote_average)}
        </div>

       </div>
      </div>
     })}
     {/* dynamic routing  5":05 break */}
     {/* ***************************************tvvvvv******************************** */}

     <div className="col-md-4">
      <div>
       <h1>trending <br /> tv <br /> to watch now</h1>
      </div>
     </div>

     {tvContainer.slice(0, 10).map((movie) => {
      return <div key={movie.id} className='col-md-2'>
       <div className='position-relative'>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className='w-100' />
        <h5>{movie.name}</h5>
        <div className='rate position-absolute top-0 end-0 bg-danger py-4 px-2'>
         {movie.vote_average}
        </div>

       </div>
      </div>
     })}


     {/* ******************************person*************************** */}
     <div className="col-md-4">
      <div>
       <h1>trending <br /> person <br /> to watch now</h1>
      </div>
     </div>

     {personContainer.slice(0, 10).map((movie) => {
      return <div key={movie.id} className='col-md-2'>
       <div className='position-relative'>
        <img src={`https://image.tmdb.org/t/p/w500${movie.profile_path}`} className='w-100' />
        <h5>{movie.name}</h5>
        <div className='rate position-absolute top-0 end-0 bg-danger py-4 px-2'>
         {movie.popularity}
        </div>

       </div>
      </div>
     })}




    </div>
   </div>



  </>
 );
}

export default Home;
