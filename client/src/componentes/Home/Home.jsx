import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames,filterByGenres,getGenres,filterCreated} from "../../action/index.js";

import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado.jsx";



export default function Home() {
  const dispatch = useDispatch();
  //paginacion
  const videitos = useSelector((state) => state.videogames);
  const generos = useSelector((state) => state.genres);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [videoPerPage] = useState(15);
  const lastVideo = currentPage * videoPerPage;
  const firstPoque = lastVideo - videoPerPage;
  const videoGap =videitos.slice(firstPoque, lastVideo);



// eslint-disable-next-line
const [order,setOrder]=useState(""); //estado local



  const paginado = (number) => {
    setCurrentPage(number);
  };




  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres())
  }, [dispatch]);



  //dispacth todos los Videogames
  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }


  function handleFilterGenres(e){
     e.preventDefault();
     dispatch(filterByGenres(e.target.value))
  }

  // Filtrado por API/DB
  function handleFilterCreated(e){
    dispatch(filterCreated(e.target.value))
    setOrder(e.target.value)}
  

  return (
    
       <div>
          <Link to="/videogame">Crear Videogame</Link>
               <h1>Videogames Cesar Restrepo</h1>
            <button onClick={(e) => {handleClick(e)}}>
              volver a cargar Videogames
            </button>
            <div>
            <div>
            <div>Filter by Genre</div>
        <select onChange={(e) => handleFilterGenres(e)}>
           <option value="All" default>All</option>
          {generos.map((G) => (
            <option value={G.name} key={G.id}>{G.name}</option>
          ))} 
        </select>
      </div>
      <div>
        <div>Order</div>
        <select >
          <option value="All" default>All</option>
          <option value="asc_name">Alphabetically (A-Z)</option>
          <option value="desc_name">Alphabetically (Z-A)</option>
          <option value="asc_rating">Rating (Lower-Higher)</option>
          <option value="desc_rating">Rating (Higher-Lower)</option>
        </select>
      </div>
      <div>
        <div>Filter by Creator</div>
        <select onChange={(e) => handleFilterCreated(e)} >
          <option value="All" default>All</option>
          <option value="Api">Api videogames</option>
          <option value="Created">User videogames</option>
        </select>
      </div>
      <Paginado
       videoPerPage={videoPerPage}
       videitos={ videitos.length}
       paginado={paginado}
          />
        {videoGap?.map((c) => {
          return (
            <Fragment key={c.id}>
              <div className="gallery-container">
                <Link to={"/home/" + c.id}>
                  <Card
                    name={c.name}
                    image={c.image}
                    genres={c.genres}
                    rating={c.rating}
                    key={c.id}
                  />
                </Link>
              </div>
            </Fragment>
          );
        })}
      </div>
  </div>   
      
  );
}
