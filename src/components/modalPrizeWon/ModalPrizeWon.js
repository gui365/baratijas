import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalPrizeWon = ({ showPrizeWonModal, handleHideModal, premioElegido }) => {
  return (
    <Modal centered show={showPrizeWonModal} onHide={() => { handleHideModal('showPrizeWonModal') }}>
      <Modal.Header style={{ height: '30vh', justifyContent: 'center' }}>
        <Modal.Title style={{ alignSelf: 'center', textAlign: 'center' }}>
          {premioElegido}
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