import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './ModalPrizeWon.scss';

const ModalPrizeWon = ({ showPrizeWonModal, handleHideModal, premioElegido }) => {
  return (
    <Modal style={{ position: 'relative' }} centered show={showPrizeWonModal} onHide={() => { handleHideModal('showPrizeWonModal') }}>
      { premioElegido.majorPrize &&
        <>
          <div class="pyro">
            <div class="before"></div>
            <div class="after"></div>
          </div>
          <span role='img' aria-label='medal emoji' id='medal-icon'>🏅</span>
        </>
      }
      <Modal.Header style={{ height: '30vh', justifyContent: 'center' }}>
        <Modal.Title style={{ alignSelf: 'center', textAlign: 'center' }}>
          ¡Felicitaciones! Te ganaste: <br/>
          <strong style={{ fontSize: '2.25rem' }}>
            {premioElegido.description}
          </strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => { handleHideModal('showPrizeWonModal') }}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalPrizeWon;