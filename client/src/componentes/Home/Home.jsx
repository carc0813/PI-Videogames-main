import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames,
  filterByGenres,
  getGenres,
  filterCreated,
  sortvgames} from "../../action/index.js";

import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Loading from "../Loading/Loading.jsx";
import  "../Home/Home.css";

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
    e.preventDefault();
    dispatch(filterCreated(e.target.value))
    setOrder(e.target.value)}


    function handleSortvgames(e) {
      e.preventDefault(); 
      dispatch(sortvgames(e.target.value))
      setOrder(`Order ${e.target.value}`) //me setea el estado local para poder tomar los cambios y poder renderizar 
  }

  // function handleFilterRating(e){
  //    e.preventDefault()
  //    dispatch(getNuevoRatin(e.target.value))
  // }

  return (
    
 <div className="c1" >
        <div  className="c2"/*className="filter"*/>
               <div>
                   <button className="hpbot" onClick={(e) => {handleClick(e)}}>
                     volver a cargar Videogames 
                    </button>
                </div>
                <div>
                <Link to= '/videogame'>
                     <button className="hpbot">Add New Videogame</button>
                </Link>
                </div>
                 {/* <div>
                     <button onClick={(e)=> handleFilterRating(e)}>recargar Rating mayor 4</button>
                 </div> */}
                  <div>
                      <SearchBar/>
                  </div>
            <div className="filter">
                <div >
                   <div >Filter by Genre</div>
                      <select className="hpfilter" onChange={(e) => handleFilterGenres(e)}>
                      <option value="All" default>All</option>
                     {generos.map((G) => (
                     <option value={G.name} key={G.id}>{G.name}</option>
                           ))} 
                     </select>
                 </div>
                <div>
                    <div>Order</div>
                    <select className="hpfilter" onChange={(e) =>handleSortvgames (e)} >
                      <option value="All" default>All</option>
                      <option value="asc_name">Alphabetically (A-Z)</option>
                      <option value="desc_name">Alphabetically (Z-A)</option>
                      <option value="asc_rating">Rating (Lower-Higher)</option>
                     <option value="desc_rating">Rating (Higher-Lower)</option>
                     </select>
                 </div>
                 <div>
                     <div>Filter by Creator</div>
                        <select className="hpfilter" onChange={(e) => handleFilterCreated(e)} >
                           <option value="All" default>All</option>
                           <option value="Api">Api videogames</option>
                           <option value="Created">User videogames</option>
                        </select>
                    </div>
              </div>  {/* ciere del filter */}
           </div>
        <div className="grid-layout">
        {videoGap.length > 0 ? videoGap.map((c) => {
          return (
            <Fragment key={c.id}>
              <div>
                  <Link to={"/home/" + c.id}>
                  <Card
                    name={c.name}
                    image={c.image}
                    genres={c.genres}
                    rating={c.rating}
                    key={c.id} />
                  </Link>
               </div>
            </Fragment>
          );
        }):<section className="flex-container">
              <div className="cargando">
                  <Loading />
              </div>
            </section>}
      </div>
    <div>
</div>
<Paginado
       videoPerPage={videoPerPage}
       videitos={ videitos.length}
       paginado={paginado}
       className="c4"
          />
</div>        
  );
}
