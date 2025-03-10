const { Router } = require("express");
const router = Router();
const { Genre } = require("../db");

router.get("/", async (req, res) => {
  try {
    let genresDB = await Genre.findAll();
    res.json(genresDB);
  } catch (err) {
    res.status(404).json({ err });
  }
});



module.exports = router;
