require("dotenv").config();
const { Videogame, Generos } = require("../db");
const { APIKEY } = process.env;
const { Router } = require("express");

const axios = require("axios");


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApi = async () => {
  let i = 1;
  let apiUrl = [];
  while (apiUrl.length <= 80) {
    let altApiUrl = await axios(
      `https://api.rawg.io/api/games?key=${APIKEY}&page=${i}`
    );
    apiUrl = apiUrl.concat(altApiUrl.data.results);
    i++;
  }

  const apiInfo = await apiUrl.map((el) => {
    return {
      id: el.id,
      name: el.name,
      image: el.background_image,
      realease: el.released,
      rating: el.rating,
      platforms: el.platforms.map((el) => el.platform.name),
      genres: el.genres.map((el) => el.name),
    };
  });
  return apiInfo;
};

const getDb = async () => {
  let gamesDb = await Videogame.findAll({
    include: {
      model: Generos,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  //console.log(gamesDb);
  return gamesDb;
};

const getAllData = async () => {
  const apiInfo = await getApi();
  const dbInfo = await getDb();
  const allInfo = apiInfo.concat(dbInfo);
  //console.log(apiInfo, "soy de la api");
  //console.log(dbInfo, "soy de la db");
  return allInfo;
};

//inicio de las rutas


router.get("/videogames", async (req, res) => {
  const allGames = await getAllData();
  const { name } = req.query;

  try {
    if (name) {
      let gameFilter = allGames.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      gameFilter
        ? res.status(200).json(gameFilter)
        : res.status(404).send("Game not Found");
    } else {
      allGames.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      res.status(200).json(allGames);
    }
  } catch (error) {
    console.log(error)

  }

});

router.get("/videogames/:id", async (req, res) => {
  const { id } = req.params;
  //const { id } =req.query
  const allGames = await getAllData();
  try {
    if (id) {
      let gameFilter = allGames.filter((el) => el.id == id);

      gameFilter
        ? res.status(200).json(gameFilter)
        : res.status(404).send("juego no encontrado");
    }
  } catch (error) {
    console.log(error)
  }

});

router.post("/videogames", async (req, res) => {


  try {
    let { name, description, release, rating, image, platforms, genres } =
      req.body;
    const newGame = await Videogame.create({
      name,
      description,
      release,
      rating,
      image,
      platforms,
    });

    const genreDb = await Generos.findAll({
      where: { name: genres },
    });

    newGame.addGeneros(genreDb);
    //console.log(genreDb);
    res.send("videogame create sucesfully");

  } catch (error) {
    console.log(error)
  }

});

router.get("/genre", async (req, res) => {
  try {
    const genreArr = [];
    const genreArrFiltered = [];
    const apiUrl = await axios(
      `https://api.rawg.io/api/games?key=${APIKEY}&page_size=100`
    );
    const apiGenres = apiUrl.data.results.map((el) => el.genres);

    apiGenres.map((el) => {
      for (let i = 0; i < el.length; i++) {
        genreArr.push(el[i]);
      }
      return genreArr;
    });

    for (let i = 0; i < genreArr.length; i++) {
      if (!genreArrFiltered.includes(genreArr[i].name)) {
        genreArrFiltered.push(genreArr[i].name);
      }
    }

    genreArrFiltered.forEach((el) => {
      Generos.findOrCreate({
        where: { name: el },
      });
    });

    const allGenres = await Generos.findAll();

    res.json(allGenres);
  } catch (error) {
    console.log(error)
  }

});

router.delete('/videogames/delete/:id', async (req, res, next) => {
  const { id } = req.params;
  //console.log(id, "soye l id  ")
  if (id.length < 35) res.json('ID must be a game from the database');
  try {
    const result = await Videogame.findOne({ where: { id: id } });
    //console.log(result,"soy result")
    if (result) {
      Videogame.destroy({
        where: {
          id: id
        }
      })
      return res.json('Game deleted').status(200);
    } else {
      return res.json('Game not found').status(404);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
