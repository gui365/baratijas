import React from 'react';
// import firebase from 'firebase'
// import { connect } from 'react-firebase'
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Button } from 'react-bootstrap';
import { listaDeBaratijas } from './data/baratijas';

import SideNav from './components/sideNav/SideNav';
import MainContent from './components/mainContent/MainContent';
import Header from './components/header/Header';
import ModalNewPlayer from './components/modalNewPlayer/ModalNewPlayer';
import ModalPrizeWon from './components/modalPrizeWon/ModalPrizeWon';

// firebase.initializeApp({
//   databaseURL: ''
// });

class App extends React.Component {

  state = {
    comenzoElJuego: false,
    vuelta: 0,
    premios: [],
    premioElegido: '',
    ahoraJuega: '',
    showNewPlayerModal: false,
    showPrizeWonModal: false,
    participantes: [
      {
        nombre: 'Lore',
        premios: ['Un cactus'],
        yaJugo: false
      },
      {
        nombre: 'Mami',
        premios: [],
        yaJugo: false
      },
      {
        nombre: 'Guille',
        premios: ['Un pulpo que baila flamenco', 'Una salchicha'],
        yaJugo: false
      },
      {
        nombre: 'Gaby',
        premios: ['Una birome'],
        yaJugo: false
      },
      {
        nombre: 'Matu',
        premios: [],
        yaJugo: false
      }
    ],
    participantesPorJugar: []
  }

  componentDidMount() {
    let listaMezclada = this.shuffle([...listaDeBaratijas]);
    listaMezclada = this.asignarIds(listaMezclada);
    
    this.setState({
      premios: listaMezclada
    })
  }

  asignarIds = (listaMezclada) => {
    return listaMezclada.map((b, i) => {
      b.id = (i + 1).toString();
      return b;
    })
  }

  shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
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

  comenzarNuevoTurno = () => {
    const chosenPlayerIndex = Math.floor(Math.random() * this.state.participantes.length);
    const array = !this.state.comenzoElJuego ? this.state.participantes : this.state.participantesPorJugar;
    const filteredArray = this.filterOutPlayer(array, chosenPlayerIndex);
    console.log(filteredArray);

    if(this.state.participantes.length !== 0) {
      const newState = {
        comenzoElJuego: true,
        ahoraJuega: array[chosenPlayerIndex].nombre,
        showNewPlayerModal: true,
        participantesPorJugar: filteredArray
      }
      this.setState(newState);
    }
  }

  filterOutPlayer = (array, playerIndex) => {
    const chosenPlayer = array[playerIndex];
    return array.filter(p => !(p.nombre === chosenPlayer.nombre));
  }
  
  // elegir participante que no haya jugado en esta vuelta
    // si todos jugaron en esta vuelta:
      // 1. vuelta ++
      // 2. reset yaJugo property for all participants

  handleHideModal = (prop) => {
    this.setState({
      [prop]: false
    })
  }

  elegirPremio = (premio) => {
    // Open modal showing what was the prize won
    this.setState({
      premioElegido: premio,
      showPrizeWonModal: true
    })
    // Assign that prize to the list of prizes for that player
    // Flip the yaJugo flag to true
    // 
  }

  render() {
    return (
      <>
        <ModalNewPlayer
          showNewPlayerModal={this.state.showNewPlayerModal}
          handleHideModal={this.handleHideModal}
          ahoraJuega={this.state.ahoraJuega}
        />
        <ModalPrizeWon
          showPrizeWonModal={this.state.showPrizeWonModal}
          handleHideModal={this.handleHideModal}
          premioElegido={this.state.premioElegido}
        />
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
            ? <MainContent
                premios={this.state.premios}
                elegirPremio={this.elegirPremio}
              />
            : ( !this.state.comenzoElJuego &&
              <div style={{ position: 'relative' }}>
                <Button
                    variant='danger'
                    onClick={this.comenzarNuevoTurno}
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