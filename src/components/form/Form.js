import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const StyledInput = styled('input')`
  border: none;
  text-align: center;
`;

const StyledForm = styled('form')`
  margin-top: 1rem;
`;

const Form = ({ agregar }) => {
  const [nombre, setNombre] = useState('');
  const [invalid, setInvalid] = useState(false);

  const handleChange = (event) => {
    setNombre(event.target.value);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    if(nombre === '') {
      setInvalid(true);
      setTimeout(() => {
        setInvalid(false);
      }, 500);
      return;
    } else {
      agregar(nombre.trim());
      setNombre('');
    }
  }

  return (
    <StyledForm onSubmit={handleFormSubmit}>
      <StyledInput placeholder={invalid ? '💩' : 'Nombre'} name='nombre' onChange={handleChange} value={nombre}/>
      <Button type='submit' style={{ padding: '1px 8px' }} size='sm' variant='dark'>Agregar</Button>
    </StyledForm>
  );
}

export default Form;