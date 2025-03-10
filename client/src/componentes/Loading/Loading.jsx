import React from "react";
import "../Loading/Loading.css";
import loading from"../../assets/img/loading.gif";

export default function Loading(){
    return(
          <div >
            <img className="cargando" src={loading}  alt="img not found " width="300px" height="250px"/>
          </div>
    )
}