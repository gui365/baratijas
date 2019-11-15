import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const StyledInput = styled('input')`
  border: none;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.1);
  ::placeholder {
    color: rgba(255, 255, 255, 0.8);
    opacity: 1;
  }
  width: 70%;
`;

const StyledForm = styled('form')`
  margin-top: 1rem;
`;

const Form = ({ agregar }) => {
  const [name, setName] = useState('');
  const [invalid, setInvalid] = useState(false);

  const handleChange = (event) => {
    setName(event.target.value);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    if(name === '') {
      setInvalid(true);
      setTimeout(() => {
        setInvalid(false);
      }, 500);
      return;
    } else {
      agregar(name.trim());
      setName('');
    }
  }

  return (
    <StyledForm onSubmit={handleFormSubmit}>
      <StyledInput placeholder={invalid ? '💩' : 'Nombre'} name='name' onChange={handleChange} value={name}/>
      <Button type='submit' style={{ padding: '1px 8px' }} size='sm' variant='dark'>+</Button>
    </StyledForm>
  );
}

export default Form;