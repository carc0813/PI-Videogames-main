require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db.js");

const router = Router();

// Función para obtener videojuegos desde la API externa
const getVideogamesApi = async () => {
  try {
    const promise1 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=50`);
    const promise2 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=50`);
    const promise3 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=50`);

    const responses = await Promise.all([promise1, promise2, promise3]);

    let apiResults = responses.flatMap(response => response.data.results);

    return apiResults.map((game) => ({
      id: game.id,
      name: game.name,
      rating: game.rating,
      image: game.background_image,
      genres: game.genres?.map((g) => g.name).filter(Boolean).join(", "),
      origin: "API"
    }));

  } catch (error) {
    console.error("Error fetching games from API:", error);
    return [];
  }
};

// Función para obtener videojuegos desde la base de datos
const getVideogamesDb = async () => {
  try {
    const dbResults = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name", "id"],
      },
    });

    return dbResults.map((game) => ({
      id: game.id,
      name: game.name,
      rating: game.rating,
      image: game.image,
      genres: game.genres?.map((g) => g.name).filter(Boolean).join(", "),
      origin: "DB"
    }));

  } catch (error) {
    console.error("Error fetching games from database:", error);
    return [];
  }
};

// Función para obtener todos los videojuegos (API + DB)
const getAllVideogames = async () => {
  const apiGames = await getVideogamesApi();
  const dbGames = await getVideogamesDb();
  return [...apiGames, ...dbGames];
};

// Ruta para obtener videojuegos, con opción de búsqueda por nombre
router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const allVideogames = await getAllVideogames();

    if (name) {
      const filteredGames = allVideogames.filter((v) =>
        v.name.toLowerCase().includes(name.toLowerCase())
      );

      return filteredGames.length
        ? res.status(200).json(filteredGames)
        : res.status(404).json({ error: "Videogames not found" });
    }

    res.status(200).json(allVideogames);

  } catch (error) {
    console.error("Error retrieving videogames:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

