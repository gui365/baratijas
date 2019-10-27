import React from 'react';
// import firebase from 'firebase'
// import { connect } from 'react-firebase'
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Button } from 'react-bootstrap';

import SideNav from './components/sideNav/SideNav';
import MainContent from './components/mainContent/MainContent';
import Header from './components/header/Header';

// firebase.initializeApp({
//   databaseURL: ''
// });

class App extends React.Component {

  state = {
    comenzoElJuego: false,
    vuelta: 0,
    participantes: [
      {
        nombre: 'Guille',
        premios: ['Un pulpo que baila flamenco', 'Una salchicha'],
        yaJugo: false
      },
      {
        nombre: 'Gaby',
        premios: ['Una birome'],
        yaJugo: true
      }
    ],
    premios: [],
    ahoraJuega: ''
  }

  agregarParticipante = (nombre) => {
    let exists = false;
    for (let i = 0; i < this.state.participantes.length; i++) {
      if(this.state.participantes[i].nombre === nombre) {
        exists = true;
      }
    }

    if(nombre !== '' && !exists) {
      const newArray = [...this.state.participantes];
      newArray.push({
        nombre,
        premios: [],
        yaJugo: false
      });
      this.setState({
        participantes: newArray
      });
    }
  }

  comenzarElJuego = () => {
    // mostrar lista de baratijas
    if(this.state.participantes.length !== 0) {
      this.setState({
        comenzoElJuego: true
      })
    }
    // elegir participante que empieza a jugar

  }
  
  // elegir participante que no haya jugado en esta vuelta
  // si todos jugaron en esta vuelta:
    // 1. vuelta ++
    // 2. reset yaJugo property for all participants

  render() {
    return (
      <>
        <Header
          vuelta={this.state.vuelta}
          comenzoElJuego={this.state.comenzoElJuego}
        />
        <Row>
          <SideNav
            comenzoElJuego={this.state.comenzoElJuego}
            participantes={this.state.participantes}
            agregar={this.agregarParticipante}
            ahoraJuega={this.state.ahoraJuega}
          />
          { this.state.comenzoElJuego
            ? <MainContent />
            : ( !this.state.comenzoElJuego &&
              <div style={{ position: 'relative' }}>
                <Button
                    variant='danger'
                    onClick={this.comenzarElJuego}
                    type='button'
                    size='lg'
                    className='mx-auto btn-comenzar'
                    style={{ width: '300px', position: 'absolute', top: '3rem', left: '25vw' }}>
                  Comenzar Juego
                </Button>
              </div>
            )
          } 
        </Row>
      </>
    );
  }
}

export default App;