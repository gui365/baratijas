import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container } from 'react-bootstrap';
import { listaDeBaratijas } from './data/baratijas';
import { shuffle, asignarIds, filterOutPlayer } from './utils/utils';

import SideNav from './components/sideNav/SideNav';
import MainContent from './components/mainContent/MainContent';
import Header from './components/header/Header';
import Toggle from './components/toggle/Toggle';
import ListaPremios from './components/listaPremios/ListaPremios';
import ModalNewPlayer from './components/modalNewPlayer/ModalNewPlayer';
import ModalPrizeWon from './components/modalPrizeWon/ModalPrizeWon';

class App extends React.Component {

  state = {
    countdown: 11,
    // comenzoElJuego: false,
    comenzoElJuego: true,
    vuelta: 0,
    premios: [],
    premioElegido: '',
    // ahoraJuega: '',
    ahoraJuega: 'Guille',
    showNewPlayerModal: false,
    showPrizeWonModal: false,
    participantes: [
      {
        nombre: 'Guille',
        premios: [],
        yaJugo: false
      }
    ],
    participantesPorJugar: [
      {
        nombre: 'Guille',
        premios: [],
        yaJugo: false
      }
    ],
    gameOver: false,
    mostrarListaPremios: true
  }

  componentDidMount() {
    let listaMezclada = shuffle([...listaDeBaratijas]);
    listaMezclada = asignarIds(listaMezclada);
    
    this.setState({
      premios: listaMezclada
    })
  }

  agregarParticipante = (nombre) => {
    let exists = false;
    for (let i = 0; i < this.state.participantes.length; i++) {
      if(this.state.participantes[i].nombre === nombre) {
        exists = true;
      }
    }

    if(!exists) {
      const newArray = [...this.state.participantes];
      newArray.push({
        nombre,
        premios: [],
        yaJugo: false
      });
      this.setState({
        participantes: newArray
      });
    } else {
      alert('💩 Ese nombre ya fue ingresado 🙄');
    }
  }

  hideShowPrizes = (e) => {
    if(e.code === 'KeyH') {
      this.setState({
        mostrarListaPremios: !this.state.mostrarListaPremios
      })
    }
  }

  comenzarJuego = () => {
    window.addEventListener('keyup', this.hideShowPrizes);
    let interval;
    if(this.state.participantes.length !== 0) {
      interval = setInterval(() => {
        this.setState({
          countdown: this.state.countdown - 1
        })
        if(this.state.countdown === 0) {
          clearInterval(interval);
          this.setState({
            comenzoElJuego: true,
            participantesPorJugar: [...this.state.participantes]
          })
          setTimeout(() => {
            this.comenzarNuevoTurno();        
          }, 0);
        }
      }, 1000);
    }
  }

  comenzarNuevoTurno = () => {
    const allPrizesGone = this.state.premios.reduce((c, p) => {
      return {
        picked: c.picked && p.picked
      };
    });
    if(!allPrizesGone.picked) {
      // Choose a random player from the list
      const playersList = this.state.participantesPorJugar.length !== 0 ? this.state.participantesPorJugar : [...this.state.participantes];
      const index = Math.floor(Math.random() * playersList.length);
      const filteredArray = filterOutPlayer(playersList, index);
      let newState = {};
        
        if(this.state.participantesPorJugar.length !== 0) {
          // No todos los participantes jugaron en esta vuelta
          newState = {...{
            ahoraJuega: playersList[index].nombre,
            showNewPlayerModal: true,
            participantesPorJugar: filteredArray
          }}
          
        } else {
          // Todos los participantes jugaron en esta vuelta
          playersList.forEach(obj => obj.yaJugo = false);
          newState = {...{
            vuelta: this.state.vuelta + 1,
            ahoraJuega: playersList[index].nombre,
            showNewPlayerModal: true,
            participantesPorJugar: filteredArray
          }}
        }
  
        this.setState(newState);
    } else {
      this.setState({
        ahoraJuega: '',
        gameOver: true
      });
    }
  }

  handleHideModal = (prop) => {
    this.setState({
      [prop]: false
    })

    if(prop === 'showPrizeWonModal') {
      this.comenzarNuevoTurno();
    }
  }

  elegirPremio = (premio, premioIndex) => {
    const copyOfArray = [...this.state.participantes];
    
    const ganador = copyOfArray.find((obj) => {
      return obj.nombre === this.state.ahoraJuega;
    });

    // Flip the yaJugo flag to true
    ganador.yaJugo = true;
    // Assign that prize to the list of prizes for that player
    ganador.premios.push(premio.description);

    // Remove picked prize from the list
    const nuevaListaPremios = [...this.state.premios];
    nuevaListaPremios[premioIndex].picked = true;

    this.setState({
      premioElegido: premio,
      // Open modal showing what was the prize won
      showPrizeWonModal: true,
      participantes: copyOfArray,
      premios: nuevaListaPremios
    })
  }

  showPrizes = () => {
    this.setState({
      mostrarListaPremios: !this.state.mostrarListaPremios
    })
  }

  render() {
    return (
      <Container style={{ minWidth: '100%' }}>
        { this.state.countdown < 11 && this.state.countdown > 0 &&
          <div id='countdown-div'>
            <p>El sorteo de las baratijas empieza en</p>
            <p id='countdown'>{this.state.countdown}</p>
          </div>
        }
        {/* <ModalNewPlayer
          showNewPlayerModal={this.state.showNewPlayerModal}
          handleHideModal={this.handleHideModal}
          ahoraJuega={this.state.ahoraJuega}
        /> */}
        <ModalPrizeWon
          ahoraJuega={this.state.ahoraJuega}
          showPrizeWonModal={this.state.showPrizeWonModal}
          handleHideModal={this.handleHideModal}
          premioElegido={this.state.premioElegido}
        />
        <Header
          vuelta={this.state.vuelta}
          comenzoElJuego={this.state.comenzoElJuego}
        />
        { this.state.comenzoElJuego &&
          <Toggle showPrizes={this.showPrizes} mostrarPremios={this.state.mostrarListaPremios} />
        }
        <Row>
          <SideNav
            comenzar={this.comenzarJuego}
            comenzoElJuego={this.state.comenzoElJuego}
            participantes={this.state.participantes}
            agregar={this.agregarParticipante}
            ahoraJuega={this.state.ahoraJuega}
          />
          <Col lg={this.state.mostrarListaPremios ? 7 : 9} style={{ paddingTop: '.5rem', textAlign: 'center' }}>
            { this.state.comenzoElJuego && !this.state.gameOver &&
              <MainContent
                premios={this.state.premios}
                elegirPremio={this.elegirPremio}
              />
            }
            {
              this.state.gameOver &&
              <p id='felicitaciones'>😊 ¡Felicitaciones a todos los ganadores! 👏</p>
            }
          </Col>
          {
            this.state.mostrarListaPremios &&
            <ListaPremios premios={this.state.premios} />
          }
        </Row>
      </Container>
    );
  }
}

export default App;