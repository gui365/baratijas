import React from 'react';
import { Col, Table } from 'react-bootstrap';
import styled from 'styled-components';
import './ListaPremios.scss';

const StyledCol = styled(Col)`
  padding: .5rem;
  text-align: center;
`;

// const StyledTableData = styled('td')`
//   font-size: .8rem;
//   text-align: left;
//   display: flex;
//   align-items: center;
// `;

// const StyledTable = styled(Table)`
//   margin-top: 1.5rem;
// `;

const StyledH3 = styled('h3')`
  font-size: 1.35rem;
  border-bottom: 1px solid #000;
  margin-bottom: 1rem !important;
`;

const StyledDiv = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid black;
  .prize {
    font-size: .8rem;
  }
`;

const ListaPremios = ({ premios }) => {
  const sortedPremios = [...premios].sort((a, b) => (a.description > b.description) ? 1 : -1);
  const unpickedPrizes = [...premios].filter(premio => !premio.picked);
  const unpickedMajorPrizes = [...premios].filter(premio => !premio.picked && premio.majorPrize);
  
  return (
    <StyledCol lg='2' id='col-listapremios'>
      <StyledH3 className='section-title'>Lista de Baratijas</StyledH3>
      <p>Quedan</p>
      <span className='emoji' role='img' aria-label='prize emoji'>🎁 {unpickedPrizes.length}</span>
      <span className='emoji' role='img' aria-label='star emoji'>⭐ {unpickedMajorPrizes.length}</span>
      
      <StyledDiv>
          { sortedPremios.map(p => {
            const prizeStyle = p.picked ? { textDecoration: 'line-through', color: '#bbb'} : {};
            return (            
              <span className='prize' style={{ margin: '.35rem .5rem', ...prizeStyle }} key={`table-${p.id}`}>
                {p.description}
                {p.majorPrize && <span role='img' aria-label='start emoji' style={{ fontSize: '.6rem' }}>⭐</span>}
              </span>
            )}
          )}
      </StyledDiv>
      {/* <StyledTable striped hover size='sm'>
        <tbody>
          { sortedPremios.map(p => {
            const prizeStyle = p.picked ? { textDecoration: 'line-through', color: '#bbb'} : {};
            return (            
              <tr key={`table-${p.id}`}>
                <StyledTableData style={ prizeStyle }>
                  {p.description}
                  {p.majorPrize && <span role='img' aria-label='start emoji' style={{ fontSize: '.6rem' }}>⭐</span>}
                </StyledTableData>
              </tr>
            )}
          )}
        </tbody>
      </StyledTable> */}
    </StyledCol>
  );
}

export default ListaPremios;
