import React from "react";
import {Link} from "react-router-dom";
import portal2 from "../../assets/img/portal2.jpg"
import "../LandingPage/ButtonHome.css"



export default function LandingPage(){
     return(
        <div>
             <h2> Welcome a Videogames</h2>
             <img src={portal2} alt="img not found " width="300px" height="250px" />
             <div>
                <Link to="/home">
                    <button type="submit" className="buton_home">Enter</button>
                </Link>
             </div>
        </div>
     )


}