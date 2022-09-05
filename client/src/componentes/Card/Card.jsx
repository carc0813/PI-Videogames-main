import React from "react";
// import {Link} from 'react-router-dom';
// import NotFound from '../NotFound/NotFound';

export default function Card({name, genres, image,rating}) {
   var genre = genres.toString()
    if (genre.length>2) {genre = genre.slice(0,2)}
    if (genre.length === 1) {
        genre = genre.toString()
    } else {
        genre = genre.toString() + " (...)"
    } 
  return (
    <div >
        <div className="NameNombres">
          <h1>{name}</h1>
        </div>
      <div className="textCard">
                <div className="nameGenres">
                <div className="name">{name}</div>
               <div className="genres">{genre}</div>
        </div>
      </div>
      <img src={image}  alt="img not found " width="300px" height="250px" />
      <div className='divRating'>
					<div className='rating'>{rating}</div>
			</div>
    </div>
    
  );
}
