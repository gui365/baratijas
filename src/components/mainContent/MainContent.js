import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components'

const StyledH3 = styled('h3')`
  font-size: 1.35rem;
  border-bottom: 1px solid #000;
  margin-bottom: 1rem !important;
`;

const StyledButton = styled(Button)`
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 50%;
  padding: 0;
  margin: .75rem;
  box-shadow: 0 5px 5px rgba(0, 0, 0, .5);
  font-size: 3rem;
  font-family: McLaren;
  font-weight: bold;
  text-shadow: 0 2px 2px rgba(0, 0, 0, .5);
  `;

const MainContent = ({ premios, elegirPremio }) => {
  return (
    <Row>
      <Col style={{ textAlign: 'center' }}>
        <StyledH3 className='section-title'>X</StyledH3>
        {
          premios.map(baratija => {
            return !baratija.picked
              ? (
                <StyledButton
                  // variant='success'
                  onClick={() => { elegirPremio(baratija, parseInt(baratija.id) - 1) }}
                  key={`premio-${baratija.id}`}
                >
                    {baratija.id}
                </StyledButton>
              )
              : null
          })
        }
      </Col>
    </Row>
  );
}

export default MainContent;