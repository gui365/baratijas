import React from 'react';

const Toggle = ({ showPrizes, mostrarPremios }) => {
  return (
    <div id='toggle'>
      <p style={{ fontSize: '1.2rem' }}>{mostrarPremios ? '🐵' : '🙈'}</p>
      <label class="switch">
        <input type="checkbox" onClick={showPrizes}/>
        <span class="slider"></span>
      </label>
    </div>
  )
}

export default Toggle;