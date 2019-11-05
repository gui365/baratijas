import React from 'react';
import '../../assets/stylesheets/Toggle.scss';

const Toggle = ({ showPrizes, mostrarPremios }) => {
  return (
    <div id='toggle'>
      <p
        style={{ fontSize: '1.2rem', cursor: 'default' }}>
          {mostrarPremios
            ? <span role='img' aria-label='emoji monkey'>🐵</span>
            : <span role='img' aria-label='emoji monkey'>🙈</span>}
      </p>
      <label className="switch">
        <input type="checkbox" onClick={showPrizes}/>
        <span className="slider"></span>
      </label>
    </div>
  )
}

export default Toggle;