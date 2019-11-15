import React from 'react';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';

const StyledTableData = styled('td')`
  font-size: .8rem;
`;

const StyledTable = styled(Table)`
  margin-top: 1rem;
  border: none !important;

  td {
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, .3) !important;
  }
  th {
    border: none;
    border-bottom: 2px solid #000 !important;
  }
`;

const ParticipantsTable = ({ participantes, ahoraJuega, gameOver }) => {
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
              const stylingPlayingNow = ahoraJuega === participante.name ? { background: 'rgba(0, 255, 115, 0.3)', color: 'white' } : {};
              const stylingAlreadyPlayed = {
                opacity: gameOver ? 1 : participante.hasPlayed ? .3 : 1,
              }
              return (            
                <tr style={{...stylingAlreadyPlayed, ...stylingPlayingNow}} key={`table-${participante.name}`}>
                  <td>
                    {participante.name}
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