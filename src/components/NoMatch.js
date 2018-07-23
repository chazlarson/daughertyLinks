import React, { Component } from "react";

const imageUrl = () => {
  const images = [
    "images/galaxy-infinity-milky-way.jpg",
    "images/astronomy-black-wallpaper-constellation.jpg",
    "images/astronaut-astronomy-exploration.jpg"
  ];

  const idx = Math.floor(Math.random() * images.length);
  return images[idx];
}

const wrapperStyle = {
  color: 'white',
  backgroundImage: `url("${imageUrl()}")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right top",
  backgroundSize: "cover"
};

const innerStyle = {
    width: '400px',
    height: '120px',
    position: 'absolute',
    top:'0',
    bottom: '0',
    left: '0',
    right: '0',
    margin: 'auto',
    //backgroundColor: 'black',
    //opacity: '0.7'
}

const NoMatch = () => (
  <div className="wrapper" style={wrapperStyle}>
    <div class="valign-wrapper center-align" style={innerStyle}>
      <h1 style={{color: 'white', opacity: '1.0', margin: '10px'}}>You seem to have taken a wrong turn.</h1>
    </div>
  </div>
);

export default NoMatch;
