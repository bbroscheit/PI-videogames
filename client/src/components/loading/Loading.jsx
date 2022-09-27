import React from 'react';
import "./Loading.css";

export default function Loading() {
  return (
    <div className='loadingContainer'>
      <img src='https://c.tenor.com/J-d_5RAF88cAAAAi/ken-masters.gif' className='loadingGif'/>
      <h1 className='loadingTitle'>Loading ...</h1>
    </div>
  )
}
