import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../actions";

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
      <input type="text" placeholder='Search...' 
      onChange={(targetValue) => handleInputChange(targetValue)}
      
      />
      <button type="button" onClick={targetValue => handleSubmit(targetValue)}>Search</button>
    </div>
  )

}

