import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../actions";
import '../styles/SearchBar.css'

export default function SearchBar(){
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  
  function handleInputChange (event){
    event.preventDefault();
    setName(event.target.value);
    
  }

  function handleSubmit (event){
    event.preventDefault();
    dispatch(getNameVideogames(name));
    
  }
  
  return (
    <div>
      <input className="search_input" type="text" placeholder='Search...' 
      onChange={(targetValue) => handleInputChange(targetValue)}
      
      />
      <button className="search_button" type="button" onClick={targetValue => handleSubmit(targetValue)}>Search</button>
    </div>
  )

}

