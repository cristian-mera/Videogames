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
    img:"",
    platforms: [],
    genres: [],
  });

  function handleChange(el) {
    setInput({
      ...input,
      [el.target.name]: el.target.value,
    });
    setErrors(
      validate({
        ...input,
        [el.target.name]: el.target.value,
      })
    );
  }

  function handleCheck(event) {
    
    if (event.target.checked) {
      setInput({
        ...input,
        platforms: [...input.platforms, event.target.value],
      });
    } else {
      setInput({
        ...input,
        platforms: input.platforms.filter((el) => el !== event.target.value),
      });
    }
  }
  
  console.log(input)

  function handleSelect(event) {
    
     console.log(event.target.value)
     
     setInput({
       ...input,
       genres: [...input.genres, event.target.value],
      });
      
  }
  


  function handleSubmit(el) {
    el.preventDefault();
    
    setErrors(
      validate({
        ...input,
        [el.target.name]: el.target.value
      })
    );
    dispatch(postVideogame(input));
    alert("Videogame created");
    setInput({
      name: "",
      description: "",
      img:"",
      released: "",
      rating: "",
      platforms: [],
      genres: [],
    });
    history.push("/home");
  }

  function handleDelete(el) {
    setInput({
      ...input,
      genres: input.genres.filter((gen) => gen !== el),
      platforms: input.platforms.filter(plat => plat !== el)
    });
  }

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

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
          <label>Platforms</label>
          <label>
            <input
              type="checkbox"
              value="PC"
              name="PC"
              onChange={(e) => handleCheck(e)}
            />
            PC
          </label>
          <label>
            <input
              type="checkbox"
              value="PS"
              name="PS"
              onChange={(e) => handleCheck(e)}
            />
            PS
          </label>
          <label>
            <input
              type="checkbox"
              value="XBOX"
              name="XBOX"
              onChange={(e) => handleCheck(e)}
            />
            XBOX
          </label>
          <label>
            <input
              type="checkbox"
              value="NINTENDO"
              name="NINTENDO"
              onChange={(e) => handleCheck(e)}
            />
            NINTENDO
          </label>
          <label>
            <input
              type="checkbox"
              value="Android"
              name="ANDROID"
              onChange={(e) => handleCheck(e)}
            />
            ANDROID
          </label>
          <label>
            <input
              type="checkbox"
              value="IOs"
              name="IOS"
              onChange={(e) => handleCheck(e)}
            />
            IOS
          </label>
          <label>Image</label>
          <input
            type="img"
            value={input.img}
            name="img"
            onChange={handleChange}
          />
        </div>
        
        <label>Released date:</label>
          <input
            type="date"
            value={input.released}
            name="date"
            onChange={handleChange}
          />

        <select onChange={(event) => handleSelect(event)}>
          {genres.map((genres) => (
            <option value={genres.name}>{genres.name}</option>
          ))}
        </select>

        <button type="submit" onClick={handleSubmit}>
          Crear VideoGame
        </button>
      </form>

      {input.genres.map((el) => {
        //MIRAR QUE TRAE EL CONSOLELOG
        
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
