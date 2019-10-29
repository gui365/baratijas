import React from 'react';
import { Col, Button } from 'react-bootstrap';
import styled from 'styled-components'
import Form from '../form/Form';
import ParticipantsTable from '../participantsTable/ParticipantsTable';

const StyledCol = styled(Col)`
  background: #eee;
  padding: .5rem;
  text-align: center;
  min-height: 85vh;
`;

const StyledH3 = styled('h3')`
  font-size: 1.35rem;
  border-bottom: 1px solid #000;
`;

const SideNav = ({ comenzoElJuego, participantes, agregar, ahoraJuega, comenzar }) => {
  return (
    <>
      <StyledCol lg='3'>
        <StyledH3>Participantes</StyledH3>
        { !comenzoElJuego &&
          <Form agregar={agregar} comenzar={comenzar} />
        }
        { !comenzoElJuego && participantes.length !== 0 &&
          <Button
              variant='danger'
              onClick={comenzar}
              type='button'
              className='btn-comenzar'
          >      
            Comenzar Juego
          </Button>
        }
        <ParticipantsTable participantes={participantes} ahoraJuega={ahoraJuega} />
      </StyledCol>
    </>
  );
}
export default SideNav;