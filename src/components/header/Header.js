import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components'

const StyledRow = styled(Row)`
  padding: 1rem;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  `;

const Header = ({ round, hasGameStarted }) => {
  return (
    <StyledRow fluid>
      <Col className='header-title' style={{ textAlign: 'center' }}>
        <h3 className='main-title'>Sorteo de Baratijas 2019</h3>
      </Col>
      <Col style={hasGameStarted ? { display: 'flex', borderLeft: '1px black solid' } : null}>
        { hasGameStarted &&
          <p style={{ alignSelf: 'center', fontSize: '1.2rem' }}>
            {round +1}<sup>a</sup> RONDA
          </p>
        }
      </Col>
    </StyledRow>
  );
}

export default Header;