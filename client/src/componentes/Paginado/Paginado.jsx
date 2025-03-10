import React from "react";
import "./Paginado.css";

export default function Paginado({ videoPerPage, paginado, videitos }) {
  const numberPag = [];
  for (let i = 1; i <= Math.ceil(videitos / videoPerPage); i++) {
    numberPag.push(i);
  }
  return (
    <nav className="pagination">
      {numberPag &&
        numberPag.map((n) => (
          <li key={n} className="pagenr">
            <button onClick={() => paginado(n)} key={n}>
              {" "}
              {n}{" "}
            </button>
          </li>
        ))}
    </nav>
  );
}
