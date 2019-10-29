import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components'
import { orden } from '../../utils/utils';

const StyledRow = styled(Row)`
  padding: .5rem;
  margin-bottom: 0;
  background-color: #ddd;
`;

const Header = ({ vuelta, comenzoElJuego }) => {
  return (
    <StyledRow fluid>
      <Col style={{ textAlign: 'right' }}>
        <h3>Sorteo de Baratijas 2019</h3>
      </Col>
      <Col style={comenzoElJuego ? { display: 'flex', borderLeft: '1px black solid' } : null}>
        { comenzoElJuego &&
          <p style={{ alignSelf: 'center', fontSize: '1.2rem' }}>{orden[vuelta].toUpperCase()} VUELTA</p>
        }
      </Col>
    </StyledRow>
  );
}

export default Header;