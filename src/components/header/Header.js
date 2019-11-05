import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components'

const StyledRow = styled(Row)`
  padding: .5rem;
  margin-bottom: 0;
  `;

const Header = ({ vuelta, comenzoElJuego }) => {
  return (
    <StyledRow fluid>
      <Col style={{ textAlign: 'right' }}>
        <h3 className='main-title'>Sorteo de Baratijas 2019</h3>
      </Col>
      <Col style={comenzoElJuego ? { display: 'flex', borderLeft: '1px black solid' } : null}>
        { comenzoElJuego &&
          <p style={{ alignSelf: 'center', fontSize: '1.2rem' }}>
            {vuelta +1}<sup>a</sup> RONDA
          </p>
        }
      </Col>
    </StyledRow>
  );
}

export default Header;