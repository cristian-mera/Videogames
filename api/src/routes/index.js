const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Genre, Videogame } = require("../db.js");
//const Videogame = require("../models/Videogame");
const { API_KEY } = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


// const getAPIinfo = async () => {
//   var gets = [1, 2, 3, 4, 5].map (async (e) => await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=25&page=${e}`))
//   let allGets = await Promise.all(gets)
//   let apiURL = allGets.reduce( (prev,curr) => {
//           return prev.concat(curr.data.results);
//       },[ ]
//   );


const getApiInfo = async () => {
  const apiUrl = await axios.get(`https://api.rawg.io/api/games${API_KEY}`);

  //hacer un ciclo FOR con ?page=i minimo 5 veces

  const apiInfo = await apiUrl.data.results.map((el) => {
    return {
      id: el.id,
      name: el.name,
      description: el.description,
      released: el.released,
      rating: el.rating,
      platforms: el.platforms.map((subEl) => subEl.platform.name),
      img: el.background_image,
      genre: el.genres.map(gen => gen.name)
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Videogame.findAll({
    include: {
      model: Genre,
      attributtes: ["name"],
      through: {
        attributtes: [],
      },
    },
  });
};

const getAllVideogames = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

router.get("/videogames", async (req, res) => {
  const name = req.query.name;
  let videogamesTotal = await getAllVideogames();
  if (name) {
    let videogameName = await videogamesTotal.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    console.log(videogameName)
    videogameName.length
      ? res.status(200).send(videogameName)
      : res.status(404).send("Game not Found");
  } else {
    res.status(200).send(videogamesTotal);
  }
});

router.get("/genres", async (req, res) => {
  const genresApi = await axios.get(`https://api.rawg.io/api/genres${API_KEY}`);
  const genres = genresApi.data.results.map((el) => el.name);
  console.log(genres);
  genres.forEach((el) => {
    Genre.findOrCreate({
      where: { name: el },
    
    });
  });

  const allGenres = await Genre.findAll();
  res.status(200).send(allGenres);
});

router.post("/videogame", async (req, res) => {
  let { name, description, released, rating, platforms, createdInDb, genre } =
    req.body;

  let videogameCreated = await Videogame.create({
    name,
    description,
    released,
    rating,
    platforms,
    createdInDb,
    genre
  });

  let genreDb = await Genre.findAll({
    where: {
      name: genre,
    },
  });

  videogameCreated.addGenre(genreDb)
  res.send('videogame Created')
});

router.get('/videogames/:id', async (req, res) => {
  const id = req.params.id;
  const  videogamesTotal = await getAllVideogames()
  if (id){
    let videogameId = await videogamesTotal.filter(el => el.id == id)
    videogameId.length ? 
    res.status(200).json(videogameId) :
    res.status(404).send('Game not found')
  }
})

module.exports = router;
