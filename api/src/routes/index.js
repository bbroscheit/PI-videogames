require("dotenv").config();
const { Videogame, Gender } = require("../db");
const { APIKEY } = process.env;
const { Router } = require("express");

const axios = require("axios");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApi = async () => {
  const apiUrl = await axios(`https://api.rawg.io/api/games?key=${APIKEY}`);

  const apiInfo = await apiUrl.data.results.map((el) => {
    return {
      id: el.id,
      name: el.name,
      image:el.background_image,
      realease: el.released,
      rating: el.rating,
      platforms: el.platforms.map((el) => el.platform.name),
      genres:el.genres.map((el) => el.name)
    };
  });
  return apiInfo;
};

const getDb = async () => {
  return await Videogame.findAll({
    include: {
      model: Gender,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllData = async () => {
  const apiInfo = await getApi();
  const dbInfo = await getDb();
  const allInfo = apiInfo.concat(dbInfo);

  return allInfo;
};

router.get("/videogames", async (req, res) => {
  const allGames = await getAllData();
  const { name } = req.query;

  if (name) {
    let gameFilter = await allGames.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    gameFilter
      ? res.status(200).send(gameFilter)
      : res.status(404).send("Game not Found");
  } else {
    res.status(202).send(allGames);
  }
});

router.get("/videogames/:id", async (req, res) => {
  const { id } = req.params;
  const allGames = await getAllData();

  if (id) {
    let gameFilter = await allGames.filter((el) => el.id == id);

    gameFilter
      ? res.status(200).json(gameFilter)
      : res.status(404).send("juego no encontrado");
  }
});

router.post("/videogames", async (req, res) => {
  let { name, description, release, rating, platforms, genre } = req.body;
  const newGame = await Videogame.create({
    name,
    description,
    release,
    rating,
    platforms,
  });

  const genreDb = await Gender.findAll({
    where: { name: genre },
  });

  newGame.addGender(genreDb);
  res.send("videogame create sucesfully");
});

router.get("/gender", async (req, res) => {
  const apiUrl = await axios(`https://api.rawg.io/api/games?key=${APIKEY}`);
  const apiGenres = apiUrl.data.results.map((el) => el.genres);
  const genresEach = apiGenres.map((el) => {
    for (let i = 0; i < el.length; i++) {
      return el[i];
    }
  });
  const onlyGenres = genresEach.map((el) => el.name);
  // onlyGenres.forEach((el) => {
  //     Gender.findOrCreate({
  //       where: { name: el },
  //     });
  // });

  const unicos = onlyGenres.reduce((accArr, valor) => {
    if (accArr.indexOf(valor) < 0) {
      accArr.push(valor);
    }
    return accArr;
  }, []);

  for (let i = 0; i < unicos.length; i++) {
    Gender.create({
       name: unicos[i],
    });
  }

  const allGenres = await Gender.findAll();

  res.send(allGenres);
});

module.exports = router;
