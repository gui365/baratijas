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
import PrizeList from './components/prizeList/PrizeList';
import ModalNewPlayer from './components/modalNewPlayer/ModalNewPlayer';
import ModalPrizeWon from './components/modalPrizeWon/ModalPrizeWon';

class App extends React.Component {

  state = {
    countdown: 11,
    hasGameStarted: false,
    round: 0,
    premios: [],
    chosenPrize: '',
    ahoraJuega: '',
    showNewPlayerModal: false,
    showPrizeWonModal: false,
    participantes: [],
    participantesPorJugar: [],
    gameOver: false,
    mostrarListaPremios: false
  }

  componentDidMount() {
    let listaMezclada = shuffle([...listaDeBaratijas]);
    listaMezclada = asignarIds(listaMezclada);
    
    this.setState({
      premios: listaMezclada
    })
  }

  agregarParticipante = (newName) => {
    let exists = false;
    for (let i = 0; i < this.state.participantes.length; i++) {
      if(this.state.participantes[i].name === newName) {
        exists = true;
      }
    }

    if(!exists) {
      const newArray = [...this.state.participantes];
      newArray.push({
        name: newName,
        premios: [],
        hasPlayed: false
      });
      this.setState({
        participantes: newArray
      });
    } else {
      alert('💩 Ese name ya fue ingresado 🙄');
    }
  }

  hideShowPrizes = (e) => {
    if(this.state.hasGameStarted && e.code === 'KeyH') {
      document.querySelector('input[type=checkbox]').click();
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
            hasGameStarted: true,
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
          // No todos los participantes jugaron en esta round
          newState = {...{
            ahoraJuega: playersList[index].name,
            showNewPlayerModal: true,
            participantesPorJugar: filteredArray
          }}
          
        } else {
          // Todos los participantes jugaron en esta round
          playersList.forEach(obj => obj.hasPlayed = false);
          newState = {...{
            round: this.state.round + 1,
            ahoraJuega: playersList[index].name,
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
      return obj.name === this.state.ahoraJuega;
    });

    // Flip the hasPlayed flag to true
    ganador.hasPlayed = true;
    // Assign that prize to the list of prizes for that player
    ganador.premios.push(premio.description);

    // Remove picked prize from the list
    const nuevaListaPremios = [...this.state.premios];
    nuevaListaPremios[premioIndex].picked = true;

    this.setState({
      chosenPrize: premio,
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
          chosenPrize={this.state.chosenPrize}
        />
        <Header
          round={this.state.round}
          hasGameStarted={this.state.hasGameStarted}
        />
        { this.state.hasGameStarted &&
          <Toggle showPrizes={this.showPrizes} mostrarPremios={this.state.mostrarListaPremios} />
        }
        <Row>
          <SideNav
            comenzar={this.comenzarJuego}
            hasGameStarted={this.state.hasGameStarted}
            participantes={this.state.participantes}
            agregar={this.agregarParticipante}
            ahoraJuega={this.state.ahoraJuega}
            gameOver={this.state.gameOver}
          />
          <Col lg='8' style={{ paddingTop: '.5rem', textAlign: 'center' }}>
            { this.state.hasGameStarted && !this.state.gameOver &&
              <MainContent
                premios={this.state.premios}
                elegirPremio={this.elegirPremio}
              />
            }
            {
              this.state.gameOver &&
              <p id='congratulations'><span aria-label="emoji" role="img">😊</span> ¡Felicitaciones a todos los ganadores! <span aria-label="emoji" role="img">👏</span></p>
            }
          </Col>
          {
            this.state.mostrarListaPremios
            ? <PrizeList premios={this.state.premios} />
            : <Col lg='2' />
          }
        </Row>
      </Container>
    );
  }
}

export default App;