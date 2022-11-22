import React from "react";
import { Link, useHistory } from "react-router-dom";
import { postVideogame, getGenres } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "../styles/videogameCreate.css";

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
    img: "",
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
  function handleDate(el) {
    console.log(el)
    setInput({
      ...input,
      released: el.target.value,
    });
    
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

  function handleSelect(event) {
    setInput({
      ...input,
      genres: [...input.genres, event.target.value],
    });
  }

  function handleSubmit(el) {
    el.preventDefault();
    if(input.name && input.description && input.rating && input.platforms){
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
        img: "",
        released: "",
        rating: "",
        platforms: [],
        genres: [],
      });
      history.push("/home");
    }else{
      alert('completar informacion')
    }

    
  }

  function handleDelete(el) {
    setInput({
      ...input,
      genres: input.genres.filter((gen) => gen !== el),
      platforms: input.platforms.filter((plat) => plat !== el),
    });
  }

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div className="create_container">
      <div className="create_container_general">
        <Link to="/home">
          <button className="create_form_button">Return</button>
        </Link>
        <h1>Create your Videogame</h1>
        <form className="create_form" action="">
          <div className="create_form_container">
            <label>Nombre</label>
            <input
              className="create_form_input"
              type="text"
              value={input.name}
              name="name"
              onChange={handleChange}
              placeholder={'Name is required'}
            />
            {errors.name && <p className="Error">{errors.name}</p>}
            {errors.name && <p className="error">{errors.name}</p>}
            <label>Description</label>
            <input
              className="create_form_input"
              type="text"
              value={input.description}
              name="description"
              onChange={handleChange}
              placeholder={'Description is required'}
            />

            <label clasName="create_checkbox">Rating: </label>
            <input
              className="create_form_input"
              _input
              type="text"
              value={input.rating}
              name="rating"
              onChange={handleChange}
              placeholder={'Rating is required'}
            />
            <div className="create_checkbox_platforms">
              <label>Platforms: </label>
              <label clasName="create_checkbox">
                <input
                  className="creatm_checkbox_input"
                  type="checkbox"
                  value="PC"
                  name="PC"
                  onChange={(e) => handleCheck(e)}
                />
                PC
              </label>
              <label clasName="create_checkbox">
                <input
                  className="creatm_checkbox_input"
                  type="checkbox"
                  value="PS"
                  name="PS"
                  onChange={(e) => handleCheck(e)}
                />
                PS
              </label>
              <label clasName="create_checkbox">
                <input
                  className="creatm_checkbox_input"
                  type="checkbox"
                  value="XBOX"
                  name="XBOX"
                  onChange={(e) => handleCheck(e)}
                />
                XBOX
              </label>
              <label clasName="create_checkbox">
                <input
                  className="creatm_checkbox_input"
                  type="checkbox"
                  value="NINTENDO"
                  name="NINTENDO"
                  onChange={(e) => handleCheck(e)}
                />
                NINTENDO
              </label>
              <label clasName="create_checkbox">
                <input
                  className="creatm_checkbox_input"
                  type="checkbox"
                  value="Android"
                  name="ANDROID"
                  onChange={(e) => handleCheck(e)}
                />
                ANDROID
              </label>
              <label clasName="create_checkbox">
                <input
                  className="creatm_checkbox_input"
                  type="checkbox"
                  value="IOs"
                  name="IOS"
                  onChange={(e) => handleCheck(e)}
                />
                IOS
              </label>
            </div>
            <label className="form_realeased_text">Image : </label>
            <input
              type="img"
              value={input.img}
              name="img"
              onChange={handleChange}
            />
          </div>

          <label className="form_realeased_text">Released: </label>
          <input 
          
            className="create_form_input date"
            type="date"
            
            name="date"
            onChange={(e) =>handleDate (e)}
            />
            {console.log(input)}

          <select onChange={(event) => handleSelect(event)}>
            {genres.map((genres) => (
              <option value={genres.name}>{genres.name}</option>
            ))}
          </select>

          <button
            className="create_form_button"
            type="submit"
            onClick={handleSubmit}
          >
            Crear VideoGame
          </button>
        </form>

        {input.genres.map((el) => {
          //MIRAR QUE TRAE EL CONSOLELOG

          return (
            <div className="divGenre">
              <p>{el}</p>
              <button
                className="create_form_button botonX"
                onClick={() => handleDelete(el)}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
