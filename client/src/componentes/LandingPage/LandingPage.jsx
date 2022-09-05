import React from "react";
import {Link} from "react-router-dom";





export default function LandingPage(){
     return(
        <div>
             <h2> Welcome a Videogames</h2>
             <div>
                <Link to="/home">
                    <button type="submit" className="buton_home">Enter</button>
                </Link>
             </div>
        </div>
     )


}