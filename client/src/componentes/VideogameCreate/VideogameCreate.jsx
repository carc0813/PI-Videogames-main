import React,{useState,useEffect} from "react";
import {Link,useHistory} from "react-router-dom";
import {getGenres, postVideogame} from "../../action/index";
import {useDispatch,useSelector} from "react-redux"; 
import "./VideogameCreate.css";

// Validaciones
function validate(game) {
  let errors = {};
  if (!game.name) {
    errors.name = "Name is required";
  }if (!game.description) {
    errors.description="Hey! Don't forget the description."
  }if (!game.released) {
    errors.released="Hey! Don't forget the date."   
  }if (game.rating > 5 || game.rating < 0) {
    errors.rating="Hey! The rating should be between 0 and 5."
  }
  return errors;
}



export default function VideogameCreate ()  {
  const dispatch=useDispatch()
  const history = useHistory();

  const genres=useSelector((state)=> state.genres)
  // console.log(genre)
  
  
  const [errors, setErrors] = useState({});


  const[game, setGame]=useState({
    name: "",
    description: "",
    image: "",
    released: "",
     rating: 0,
    genre: [],
    platforms: [],
    //createdInDb
   })


   const randomPlatforms = ["PC", "iOS", "Android", "macOS",  "PlayStation 4", "PlayStation 5", "Xbox", "PS Vita"]

  useEffect(()=>{
    dispatch(getGenres())
  },[dispatch]);

 
  //para los inputs
  function ChangeInput(e){
    setGame({
      ...game,
      [e.target.name]: e.target.value,
  });

  setErrors(
    validate({
      ...game,
      [e.target.name]: e.target.value,
    })
  );
  console.log(game);


}


//para el chechbox
function handleCheck(e){
  if(e.target.checked){
      setGame({
           ...game,
           platforms:e.target.value
      })
  }
  console.log(game)
}

//select para seleccionar los generos 
function   handleSelect(e){
  if(game.genre.includes(e.target.value)){
    alert("ya existe este genero")
  }else{
    setGame({
      ...game,
      genre:[...game.genre,e.target.value]
  })
 }
 console.log(game)
}

const handleDelete = (el) => {
  setGame({
    ...game,
    genre: game.genre.filter((g) => g !== el),
  });
};




function handleSubmit (e) {
  e.preventDefault();

  dispatch(postVideogame(game));
  e.target.reset();
  alert("Videogame created successfully!");
 

  setGame({
      name: "",
      description: "",
      image: "",
      released: "",
      rating: 0,
      genre: [],
      platforms: [],
     //createdInDb
  });

  history.push("/home");
};
  
  
  
  return (
    <div className="container">
    <Link to="/home"><button>Volver</button></Link>
    <h1>Crea tu Videogame!</h1>
 
     <form
    id="survey-form"
    className="form"
    noValidate
    onSubmit={(e) => handleSubmit(e)}>
    <div>
        <div>
              <div className="divTitles">
            <div>
                <label>-Name-</label>
                <input
                className="label"
                type="text"
                name="name"
                value={game.name}
                onChange={(e) => ChangeInput(e)}/>
               {errors.name && <p className="errors">{errors.name}</p>}
            </div>
            <div>
                <label>-Description-</label>
                <input
                className="label"
                type="text"
                name="description"
                value={game.description}
                onChange={(e) => ChangeInput(e)}
                />
                {errors.description && <p className="errors">{errors.description}</p>}
            </div>
            <div>
                <label>-Released-</label>
                <input
                className="label"
                type="date"
                name="released"
                value={game.released}
                onChange={(e) => ChangeInput(e)}
                />
                  {errors.released && <p className="errors">{errors.released}</p>}
            </div>
            <div>
                <label>-Rating-</label>
                <input
                className="label"
                type="number"
                name="rating"
                value={game.rating}
                onChange={(e) => ChangeInput(e)}
                />
                {errors.rating && <p className="errors">{errors.rating}</p>}
            </div>
        </div>
        <div className="imagediv">
            <label>-Image URL-</label>
            <input
            className="imagein"
            type="text"
            name="image"
            value={game.image}
            onChange={(e) => ChangeInput(e)}
            ></input>
        </div>
    </div>
        <div className="checkboxs">
            <div className="checks">
                <label>-Genres-</label>
                <div className="gendivs">
                    <select onChange={(e)=> handleSelect(e)}>
                    
                      {genres.map((g)=>(
                        
                        <option value={g.name} key={g.id}>{g.name}</option>
                      ))}
                   </select>
                   
                   <ul><li>{game.genre.map(el=>el + ",")}</li></ul>
                </div>
            </div>
             <div className="checks">
                <label>-Platforms-</label>
                <div >
                <div >
                    {randomPlatforms.map((P) => (
                    <div key={P}>
                        <input
                        type="checkbox"
                        name="platforms"
                        value={P}
                        onChange={(e)=> handleCheck(e)}
                        ></input>
                        <label name={P}>{P}</label>
                    </div>
                    ))}
                </div>
                </div>
            </div> 
         </div>
        <button className="button" type="submit">
            Create Videogame
        </button>
    </div>
</form>
       <div className="">
        <h2>Genres</h2>
       </div>
         {game.genre.map((el) => (
        <div key={el} onClick={() => handleDelete(el)}>
          <p>{`${el}`}</p>
        </div>
      ))}
    </div>
    )
}

