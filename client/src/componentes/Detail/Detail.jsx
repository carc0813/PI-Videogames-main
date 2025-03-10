import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../../action";
import { useEffect } from "react";
import "./Detail.css";


export default function Detail() {

  const dispatch = useDispatch()
  let { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch,id]);

  const myVideogame = useSelector((state) => state.detail);
  console.log(myVideogame)




  return (
    <div className="wrapper">
       {myVideogame.name ? (
        <div className="contarea">
          <h1>Soy {myVideogame.name}</h1>
            <img src={myVideogame.img ? myVideogame.img : myVideogame.image} alt="" width="300px" height="250px" />
          <div>
            <h5>({myVideogame.released})</h5>
          </div>
          <div className="details">
            <div className="text">
              <h2>About this game:</h2>
              <p>{myVideogame.description}</p>
            </div>
          </div>
          <div className="Genres">
            <div className="genres">
              It's an{" "}
              {!myVideogame.createdInDb
                ? myVideogame.genres + " "
                : myVideogame.genres.map((el) => el.name + "")}
              game ranked at {myVideogame.rating} points.
            </div>
          </div>
          <div className="Platforms">
            <div className="platforms">
              <p>Play it at {myVideogame.platforms}.</p>
            </div>

          </div>
          <Link to="/home">
        <button className="botback" type="submit">
          🡸
        </button>
      </Link>
        </div>
      ) : (
        <p>Loading....</p>
      )}
 </div>
  );
}
