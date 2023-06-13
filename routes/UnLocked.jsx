import React from 'react';
import image from '../images/fly.jpeg';

function Unlocked() {
  return (
    <>
	 <h2>Du skriver i #Grupp 1</h2>
      <img src={image} alt="En bild på en fjäril" />
      <h3>Här finns ingenting att visa</h3>
      <p>Förutom att du enbart kommer åt den här sidan som inloggad</p>
    </>
  );
}

export default Unlocked;
