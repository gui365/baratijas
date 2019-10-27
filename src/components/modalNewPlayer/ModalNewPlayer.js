import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalNewPlayer = ({ showNewPlayerModal, handleHideModal, ahoraJuega }) => {
  return (
    <Modal centered show={showNewPlayerModal} onHide={handleHideModal}>
      <Modal.Header style={{ height: '30vh', justifyContent: 'center' }}>
        <Modal.Title style={{ alignSelf: 'center', textAlign: 'center' }}>
          Le toca elegir a <br/>
          <strong style={{ fontSize: '2.25rem' }}>{ahoraJuega}</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleHideModal}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalNewPlayer;


