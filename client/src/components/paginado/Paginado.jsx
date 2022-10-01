
import React from 'react';
import './paginado.css'

export default function Paginado({gamesForPage, games, paginado}) {
  
  const numberPage =[];
  
  for(let i=0; i< Math.ceil(games/gamesForPage);i++){
    numberPage.push(i+1)
  }

  return (
    <div className='paginadoContainer'>
      <ul className='paginadoList'>
        {
          numberPage && numberPage.map(number => 
            <li>
              <a onClick={()=>paginado(number)} className="listLink" key={number}>{number}</a>
            </li>)
        }
      </ul>
    </div>
  )
}
