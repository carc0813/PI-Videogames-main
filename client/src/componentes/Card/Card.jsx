import React from "react";
import "./Card.css"

export default function Card({ name, genres, image, rating }) {
  // var expresionRegular = /\s*;\s*/;
  var genre = genres.toString(" ");
  //   //  console.log(genre)
  //   if(genre.length ===1){
  //     genre=genre[0].toString();
  //   }
  //   if(genre>=2){
  //     genre=genre.slice(0,2)
  //   }else{
  //      genre=genre.toString()
  //   }

  // if (genre.length>2) {genre = genre.slice(0,2)
  //  //console.log(genre.length)
  // }
  // if (genre.length === 1) {
  //     genre = genre.toString()
  // } else {
  //     genre = genre.toString() + " (...)"
  // }

  return (
    <div className="container">
      <div className="card">
        <h4>{name}</h4>
        <img className="imag"src={image} alt="img not found " width="300px" height="250px" />
        <p>{genre}</p>
        <span>{rating}</span>
      </div>
    </div>
  );
}
