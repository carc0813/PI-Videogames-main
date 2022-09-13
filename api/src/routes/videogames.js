require("dotenv").config();
const { Router, response } = require("express");
const axios = require("axios");
const {API_KEY} = process.env;

const { Videogame, Genre } = require("../db.js");

const router = Router();

router.get("/", async (req, res) => {
  try {
  const  getVidegamesApi = async () => {
      
    const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=100`);
      apiResult=apiUrl.data.results
      //console.log(apiUrl)
      try {
      
          promise1 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=50`),
          promise2 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=50`),
         promise3 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=50`)
       
       return await Promise.all([promise1, promise2, promise3]).then((values)=>{
        apiResult = values[0].data.results.concat(values[1].data.results).concat(values[2].data.results)
        apiResult = apiResult.map((videos) => {
          return {
            id: videos.id,
            name: videos.name,
            rating: videos.rating,
            image: videos.background_image,
            genres: videos.genres &&
            videos.genres.map((p) => p.name).filter((p) => p != null).join(", "),
          };
        });
        return apiResult;
       })
                    
  
      } catch (error) {
        console.log(error)
      }
    
    };

    const getVideogamesDb = async () => {
      return await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ["name", "id"],
            trought: { attributes: [] },
          },
      });
    };



   const getAllVideogames= async()=>{
      const api= await getVidegamesApi();
      var db= await  getVideogamesDb();
         db=db.map((videos)=>{
          return {
            id: videos.id,
            name: videos.name,
            rating: videos.rating,
            image: videos.image,
            genres: videos.genres &&
            videos.genres.map((p) => p.name).filter((p) => p != null).join(", "),
          };

         })
      const result= api.concat(db);

      return result;
   }

   const { name } = req.query;

    const allVideogames = await getAllVideogames();
    if (name) {
      const videogames = allVideogames.filter((v) =>
        v.name.toLowerCase().includes(name.toLowerCase())); 
      videogames.length
        ? res.status(200).send(videogames)
        : res.status(404).send("Videogames not found");
    } else {
      res.status(200).send(allVideogames);
    }

  } catch (error) {
    console.log(error);
  }
});


module.exports = router;