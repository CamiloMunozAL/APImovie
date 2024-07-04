import dotenv from "dotenv";
import express from "express";
import api from "./api.js";
dotenv.config();

console.clear();
const expressApp = express();

expressApp.use(express.json());

const PORT = process.env.PORT || 3000;

//Endpoint para listar peliculas
expressApp.get("/api/movies", async (req, res, next) => {
  try {
    //Obtener parametros de la query de la URL request
    const { page, region, language = "en-US", query, genre } = req.query;
    //Obtener datos de la API
    const response = await api.get("/discover/movie", {
      params: {
        page,
        region,
        language,
        with_genres: genre,
      },
    });

    //Filtra las peliculas por el query
    if (query) {
      response.data.results = response.data.results.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    //Enviar respuesta
    res.send(response.data);
  } catch (error) {
    next(error);
  }
});

//Endpoint para obtener una pelicula por ID
expressApp.get("/api/movies/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await api.get(`/movie/${id}`);
    res.send(response.data);
  } catch (error) {
    next(error);
  }
});

expressApp.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
