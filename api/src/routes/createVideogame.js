const { Router } = require("express");
const { Videogame, Genre } = require("../db.js");

const router = Router();

//Recibe la data colectada desde el formulario por el body
// Creo el videojuego en la db

//Add a videogame to the database
router.post("/", async (req, res) => {
  // let { name, description, image, released, rating, platforms, genre} = req.body;
 
 
  // platforms = platforms.toString();

  // const addVgame = await Videogame.create({
  //      name,
  //     description,
  //     image: image  ? image
  //     : "https://media.rawg.io/media/games/d58/d588947d4286e7b5e0e12e1bea7d9844.jpg",
  //   released,
  //   rating,
  //   platforms,
    
  // });

  // //Find videogame genres from Genres table
  // const vg_genre = await Genre.findAll({
  //   where: { name: genre },
  // });
  // //Generate Table association Videogame-Genres link
  // addVgame.addGenre(vg_genre);

  // res.send("New video game has been added");
  const { name, description, image, released, rating, platforms, genre } = req.body;

let platformString = platforms.toString();

let gameCreated = await Videogame.create({
  name,
  description,
  image, 
  released,
  rating,
  platforms: platformString,
})

genre.forEach(async (G) => {
    let genresGame = await Genre.findOne({ where: { name: G } })
    await gameCreated.addGenre(genresGame)
})
  res.send('Videogame created successfully!')
});

module.exports = router;