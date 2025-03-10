require("dotenv").config();
const { Router } = require('express');
const axios = require('axios');
const { API_KEY } = process.env;
const { Genre } = require('./src/db.js');

const router = Router();

// Obtengo los genres desde la API y los guardo en la DB



        const dbReloadVideogames=async()=>{
            
            const genresAPI = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
            genresAPI.data.results.forEach(p => {
                Genre.findOrCreate({
                    where: { name: p.name }
                })
            })
        
        }
        
       


module.exports = {
    dbReloadVideogames
}