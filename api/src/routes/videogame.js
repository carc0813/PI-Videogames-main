require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db.js");

const router = Router();

// Función para obtener datos desde la base de datos
const getGameFromDB = async (id) => {
  const gameDB = await Videogame.findOne({
    where: { id },
    include: {
      model: Genre,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  if (!gameDB) return null;

  return {
    id: gameDB.id,
    name: gameDB.name,
    image: gameDB.image,
    rating: gameDB.rating,
    description: gameDB.description,
    released: gameDB.released,
    platforms: gameDB.platforms,
    createdAt: gameDB.createdAt,
    updatedAt: gameDB.updatedAt,
    genres: gameDB.genres.map((g) => g.name).join(", "),
  };
};

// Función para obtener datos desde la API externa
const getGameFromAPI = async (id) => {
  const url = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;
  const { data } = await axios.get(url);

  return {
    id: data.id,
    name: data.name,
    image: data.background_image,
    genres: data.genres?.map((g) => g.name).join(", ") || "",
    description: data.description_raw,
    released: data.released,
    rating: data.rating,
    platforms: data.platforms?.map((p) => p.platform.name).join(", ") || "",
  };
};

// Ruta para obtener el detalle de un videojuego por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const gameData = id.includes("-") ? await getGameFromDB(id) : await getGameFromAPI(id);
    
    if (!gameData) {
      return res.status(404).json({ error: "ID not found" });
    }

    res.json(gameData);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving game data" });
  }
});

module.exports = router;

