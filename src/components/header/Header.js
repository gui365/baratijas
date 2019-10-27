import React from 'react';
import { Jumbotron, Row, Col } from 'react-bootstrap';
import styled from 'styled-components'

const StyledJumbotron = styled(Jumbotron)`
  padding: .5rem;
  margin-bottom: 0;
`;

const Header = ({ vuelta, comenzoElJuego }) => {
  const vueltas = ['Primera', 'Segunda', 'Tercera', 'Cuarta', 'Quinta', 'Sexta'];
  return (
    <StyledJumbotron>
      <Row>
        <Col style={{ textAlign: 'right' }}>
          <h3>Sorteo de Baratijas 2019</h3>
        </Col>
        <Col style={comenzoElJuego ? { display: 'flex', borderLeft: '1px black solid' } : null}>
          { comenzoElJuego &&
            <p style={{ alignSelf: 'center', fontSize: '1.2rem' }}>{vueltas[vuelta].toUpperCase()} VUELTA</p>
          }
        </Col>
      </Row>
    </StyledJumbotron>
  );
}

export default Header;
