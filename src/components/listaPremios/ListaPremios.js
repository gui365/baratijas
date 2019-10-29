import React from 'react';
import { Col, Table } from 'react-bootstrap';
import styled from 'styled-components';
import { shuffle } from '../../utils/utils';

const StyledCol = styled(Col)`
  background: #eee;
  padding: 1rem;
  text-align: center;
`;

const StyledTableData = styled('td')`
  font-size: .8rem;
`;

const StyledTable = styled(Table)`
  margin-top: 1.5rem;
  margin-left: .5rem;
`;

const StyledH3 = styled('h3')`
  font-size: 1.35rem;
  border-bottom: 1px solid #000;
  margin-bottom: 1rem !important;
`;

const ListaPremios = ({ premios }) => {
  const sortedPremios = [...premios].sort((a, b) => (a.description > b.description) ? 1 : -1);
  return (
    <StyledCol lg='3'>
      <StyledH3>Lista de Baratijas</StyledH3>
      <StyledTable striped hover size='sm'>
        <tbody>
          { sortedPremios.map(p => {
            const prizeStyle = p.picked ? { textDecoration: 'line-through', color: '#bbb'} : {};
            return (            
              <tr key={`table-${p.id}`}>
                <StyledTableData style={ prizeStyle }>
                  {p.description}
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
