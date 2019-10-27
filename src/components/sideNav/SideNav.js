import React from 'react';
import { Col } from 'react-bootstrap';
import styled from 'styled-components'
import Form from '../form/Form';
import ParticipantsTable from '../participantsTable/ParticipantsTable';
// import img from '../../images/stars01.jpg'

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

const SideNav = ({ comenzoElJuego, participantes, agregar, ahoraJuega }) => {
  return (
    <>
      <StyledCol lg='3'>
        <StyledH3>Participantes</StyledH3>
        { !comenzoElJuego &&
          <Form agregar={agregar} />
        }
        <ParticipantsTable participantes={participantes} ahoraJuega={ahoraJuega} />
      </StyledCol>
    </>
  );
}

export default SideNav;