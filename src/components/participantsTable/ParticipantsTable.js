import React from 'react';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';

const StyledTableData = styled('td')`
  text-align: left;
  font-size: .8rem;
`;

const StyledTable = styled(Table)`
  margin-top: 1.5rem;
  margin-left: .5rem;
`;

const ParticipantsTable = ({ participantes, ahoraJuega }) => {
  return (
    <StyledTable striped hover size='sm'>
      { participantes.length !== 0 &&
        <>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Premios</th>
            </tr>
          </thead>
          <tbody>
            { participantes.map(participante => {
              const stylingPlayingNow = ahoraJuega === participante.nombre ? { background: 'green', color: 'white' } : {};
              const stylingAlreadyPlayed = {
                color: participante.yaJugo ? '#ccc' : '#000',
              }
              return (            
                <tr style={{...stylingAlreadyPlayed, ...stylingPlayingNow}} key={`table-${participante.nombre}`}>
                  <td>
                    {participante.nombre}
                  </td>
                  <StyledTableData>
                    {participante.premios.join(' | ')}
                  </StyledTableData>
                </tr>
              )}
            )}
          </tbody>
        </>
      }
    </StyledTable>
  );
}

export default ParticipantsTable;