import React from 'react';
import { Col, Button } from 'react-bootstrap';
import styled from 'styled-components'
import Form from '../form/Form';
import ParticipantsTable from '../participantsTable/ParticipantsTable';

const StyledCol = styled(Col)`
  padding: .5rem;
  text-align: center;
  min-height: 85vh;
  `;
  // background-color: rgba(0, 0, 0, 0.1);

const StyledH3 = styled('h3')`
  font-size: 1.35rem;
  border-bottom: 1px solid #000;
`;

const SideNav = ({ hasGameStarted, participantes, agregar, ahoraJuega, comenzar, gameOver }) => {
  return (
    <>
      <StyledCol lg='2'>
        <StyledH3 className='section-title'>Participantes</StyledH3>
        { !hasGameStarted &&
          <Form agregar={agregar} comenzar={comenzar} />
        }
        { !hasGameStarted && participantes.length !== 0 &&
          <Button
              variant='danger'
              onClick={comenzar}
              type='button'
              className='btn-comenzar'
          >      
            COMENZAR SORTEO
          </Button>
        }
        <ParticipantsTable gameOver={gameOver} participantes={participantes} ahoraJuega={ahoraJuega} />
      </StyledCol>
    </>
  );
}
export default SideNav;