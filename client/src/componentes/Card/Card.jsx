import React from "react";
import "./Card.css"

export default function Card({ name, genres, image, rating }) {
 
  var genre = genres.toString(" ");


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
