import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components'

const StyledH3 = styled('h3')`
  font-size: 1.35rem;
  border-bottom: 1px solid #000;
  margin-bottom: 1rem !important;
`;

const StyledButton = styled(Button)`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  padding: 0;
  margin: .75rem;
  font-size: 3rem;
  font-family: 'Staatliches';
  box-shadow: 0 5px 5px grey;
`;

const MainContent = ({ premios, elegirPremio, mostrarListaPremios }) => {
  return (
    <Row>
      <Col style={{ textAlign: 'center' }}>
        <StyledH3>? ? ?</StyledH3>
        {
          premios.map(baratija => {
            if(!baratija.picked) {
              return (
                <StyledButton
                  variant='success'
                  onClick={() => { elegirPremio(baratija.description, parseInt(baratija.id) - 1) }}
                  key={`premio-${baratija.id}`}
                >
                    {baratija.id}
                </StyledButton>
              )
            }
          })
        }
      </Col>
    </Row>
  );
}

export default MainContent;