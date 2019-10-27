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

  const handleChange = (event) => {
    setNombre(event.target.value);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    agregar(nombre.trim());
    setNombre('');
  }

  return (
    <StyledForm onSubmit={handleFormSubmit}>
      <StyledInput placeholder='Nombre' name='nombre' onChange={handleChange} value={nombre}/>
      <Button type='submit' style={{ padding: '1px 8px' }} size='sm' variant='dark'>Agregar</Button>
    </StyledForm>
  );
}

export default Form;