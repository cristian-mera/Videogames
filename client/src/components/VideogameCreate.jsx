import React from "react";
import { Link, useHistory } from "react-router-dom";
import { postVideogame, getGenres } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Insert a name";
  } else if (!input.description) {
    errors.description = "Description is required";
  }
  return errors;
}

export default function VideogameCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((state) => state.genres);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    genre: [],
  });

  function handleChange(el) {
    setInput({
      ...input,
      [el.target.name]: el.target.value
    });
    setErrors(
      validate({
        ...input,
        [el.target.name]: el.target.value,
      })
    );
  }

  function handleCheck(event) {
    if (event.target.cheked) {
      setInput({
        ...input,
        status: event.target.value,
      });
    }
  }

  function handleSelect(event) {
    setInput({
      ...input,
      genre: [...input.genre,event.target.value],
    });
  }

  function handleSubmit(el) {
    el.preventDefaul();
    console.log(input);
    setErrors(
      validate({
        ...input,
        [el.target.name]: el.target.value,
      })
    );
    dispatch(postVideogame(input));
    alert("Videogame created");
    setInput({
      name: "",
      description: "",
      released: "",
      rating: "",
      platforms: [],
      genre: [],
    });
    history.push("/home");
  }

  function handleDelete(el) {
    setInput({
      ...input,
      genre: input.genre.filter((gen) => gen !== el),
    });
  }

  useEffect(() => {
    dispatch(getGenres());
  },[dispatch]);

  return (
    <div>
      <Link to="/home">
        <button>Return</button>
      </Link>
      <h1>Create you Videogame</h1>
      <form action="">
        <div>
          <label>Nombre</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
          <label>Description</label>
          <input
            type="text"
            value={input.description}
            name="description"
            onChange={handleChange}
          />
          <label>Ratin</label>
          <input
            type="text"
            value={input.rating}
            name="rating"
            onChange={handleChange}
          />
          <label onChange={handleCheck}>Platforms</label>
          <label>
            <input type="checkbox" value="PC" name="PC" />
          </label>
          <label>
            <input type="checkbox" value="PS" name="PC" />
          </label>
          <label>
            <input type="checkbox" value="XBOX" name="PC" />
          </label>
          <label>
            <input type="checkbox" value="NINTENDO" name="PC" />
          </label>
          <label>Image</label>
          <input type="img" value={input.img} name="img" />
        </div>

        <select onChange={(event) => handleSelect(event)}>
          {genres.map((genre) => (
            <option value={genre.name}>{genre.name}</option>
          ))}
        </select>

        <button type="submit" onClick={handleSubmit}> Crear VideoGame</button>
      </form>

      {input.genre.map((el) => {

        //MIRAR QUE TRAE EL CONSOLELOG
        console.log(el);
        return (
          <div className="divGenre">
            <p>{el}</p>
            <button className="botonX" onClick={() => handleDelete(el)}>
              X
            </button>
          </div>
        );
      })}
    </div>
  );
}
