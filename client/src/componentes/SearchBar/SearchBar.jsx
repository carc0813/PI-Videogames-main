import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchVideogames } from "../../action";
import "../SearchBar/SearchBar.css";

export default function SearchBar() {
  const dispacth = useDispatch();

  const [name, SetName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    SetName(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.length === 0) {
      alert("por favor esscriba un Nombre para Iniciar la Busqueda");
    } else {
      dispacth(searchVideogames(name));
      SetName("");
    }
  };

  return (
    <div>
      <div className="sbcontainer">
        <input
          value={name}
          onChange={(e) => handleInputChange(e)}
          placeholder="Search"
          type="search"
          className="sbinput"
        />
         <button className="sbbot" type="submit" onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
      </div>
       
    </div>
  );
}
