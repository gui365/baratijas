import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Button } from 'react-bootstrap';

import SideNav from './components/sideNav/SideNav';
import MainContent from './components/mainContent/MainContent';
import Header from './components/header/Header';

class App extends React.Component {

  state = {
    vuelta: 1,
    participantes: [],
    premios: [],
    nowPlaying: false
  }

  agregarParticipante = (nombre) => {
    let exists = false;
    for (let i = 0; i < this.state.participantes.length; i++) {
      if(this.state.participantes[i] === nombre) {
        exists = true;
      }
    }

    if(nombre !== '' && !exists) {
      const newArray = [...this.state.participantes];
      newArray.push(nombre);
      this.setState({
        participantes: newArray
      });
    }
  }

  render() {
    return (
      <>
        <Header />
        <Row>
          <SideNav
            participantes={this.state.participantes}
            agregar={this.agregarParticipante}
          />
          { this.state.nowPlaying
            ? <MainContent />
            : <Button
                  size='lg'
                  className='mx-auto btn-comenzar'
                  style={{ alignSelf: 'center' }}>
                Comenzar Juego
              </Button>
          } 
        </Row>
      </>
    );
  }
}

export default App;