import React from "react";

export default function Paginado({ videoPerPage, paginado, videitos }) {
  const numberPag = [];
  for (let i = 1; i <= Math.ceil(videitos / videoPerPage); i++) {
    numberPag.push(i);
  }
  return (
    <nav>
      <ul>
        
          {numberPag &&
            numberPag.map((n) => (
              <p className="number" key={n}>
                <button onClick={() => paginado(n)} key={n}> {n}{" "}</button>
              </p>
            ))}
        
      </ul>
    </nav>
  );
}
