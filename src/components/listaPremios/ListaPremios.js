import React from 'react';
import { Col, Table } from 'react-bootstrap';
import styled from 'styled-components';

const StyledCol = styled(Col)`
  background: #eee;
  padding: .5rem;
  text-align: center;
`;

const StyledTableData = styled('td')`
  font-size: .8rem;
  text-align: left;
  display: flex;
  align-items: center;
`;

const StyledTable = styled(Table)`
  margin-top: 1.5rem;
`;

const StyledH3 = styled('h3')`
  font-size: 1.35rem;
  border-bottom: 1px solid #000;
  margin-bottom: 1rem !important;
`;

const ListaPremios = ({ premios }) => {
  const sortedPremios = [...premios].sort((a, b) => (a.description > b.description) ? 1 : -1);
  return (
    <StyledCol lg='2'>
      <StyledH3>Lista de Baratijas</StyledH3>
      <StyledTable striped hover size='sm'>
        <tbody>
          { sortedPremios.map(p => {
            const prizeStyle = p.picked ? { textDecoration: 'line-through', color: '#bbb'} : {};
            return (            
              <tr key={`table-${p.id}`}>
                <StyledTableData style={ prizeStyle }>
                  {p.description}
                  {p.majorPrize && <span style={{ fontSize: '.6rem', marginLeft: '.5rem' }}>⭐</span>}
                </StyledTableData>
              </tr>
            )}
          )}
        </tbody>
      </StyledTable>
    </StyledCol>
  );
}

export default ListaPremios;
