import React from 'react';
import { Col } from 'react-bootstrap';
import styled from 'styled-components'
import Form from '../form/Form';
import ParticipantsTable from '../participantsTable/ParticipantsTable';
import img from '../../images/stars01.jpg'

// background-image: url(${img});
// background-size: cover;
const StyledCol = styled(Col)`
  background: #eee;
  padding: 1rem;
  text-align: center;
`;

const StyledH3 = styled('h3')`
  font-size: 1.35rem;
  border-bottom: 1px solid #000;
`;

const SideNav = ({ participantes, agregar }) => {
  return (
    <>
      <StyledCol lg='3'>
        <StyledH3>Participantes</StyledH3>
        <Form agregar={agregar} />
        <ParticipantsTable />
      </StyledCol>
      <StyledCol lg='3'>
        {participantes.length !== 0 &&
          participantes.map(participante => <p>{participante}</p>)
        }
      </StyledCol>
    </>
  );
}

export default SideNav;