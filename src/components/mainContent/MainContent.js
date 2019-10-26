import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components'

const StyledH3 = styled('h3')`
  font-size: 1.35rem;
  border-bottom: 1px solid #000;
`;

const MainContent = () => {
  return (
    <Col lg='9' style={{ paddingTop: '1rem' }}>
      <Row>
        <Col style={{ textAlign: 'center' }}>
          <StyledH3>Premios</StyledH3>
        </Col>
      </Row>
    </Col>
  );
}

export default MainContent;