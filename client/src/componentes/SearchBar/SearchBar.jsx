import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchVideogames } from "../../action";


export default function SearchBar(){
    const dispacth=useDispatch()


    const [name,SetName]=useState(" ")
    
 
 
    function handleInputChange(e){
        e.preventDefault()
       SetName(e.target.value)
       
    }
 
 
    function handleSubmit(e){
        e.preventDefault()
        if(name.length===0){
          alert("Por favor ingrese el Nombre de Videogame")  
        }else{
            dispacth(searchVideogames(name))
            SetName(" ")  
        }
       
    }
 
    return (<div>
           <input 
              type='text'
              placeholder="Buscar..."
              onChange={(e)=>handleInputChange(e)}
            />
            <button type="submit" onClick={(e)=>handleSubmit(e)}>Buscar</button>
           
           
    </div>)
 
 
 }