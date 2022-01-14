let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevoJuego = document.querySelector("#btnNuevoJuego");

const puntosHTML = document.querySelectorAll("small");
const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");
let puntosJugador = 0;
let puntosComputadora = 0;

const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let especial of especiales) {
      deck.push(especial + tipo);
    }
  }

  deck = _.shuffle(deck);
  return deck;
};

crearDeck();

const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No hay cartas en el deck";
  }
  const removed = deck.splice(0, 1); //deck.pop();
  return removed.toString();
};

// pedirCarta();

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1); // obtenemos todo el valor numérico
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1; //convertimos string a number
};

// valorCarta("2D");

const turnoComputadora = (puntosMinimosJugador) => {
  do {
    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntosHTML[1].innerText = puntosComputadora;

    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");

    divCartasComputadora.append(imgCarta);
    if (puntosMinimosJugador > 21) {
      break; //no hace falta que siga el bucle
    }
  } while (
    puntosComputadora < puntosMinimosJugador &&
    puntosMinimosJugador <= 21
  );

  setTimeout(() => {
    if (puntosComputadora === puntosMinimosJugador) {
      alert("Nadie gana");
    } else if (puntosMinimosJugador > 21) {
      alert("La computadora gana");
    } else if (puntosComputadora > 21) {
      alert("Jugador gana");
    } else {
      alert("La computadora gana");
    }
  }, 20); //necesitamos que se evalue después del while
};

const resetJuego = () => {
  deck = [];
  deck = crearDeck ();

  btnPedir.disabled = false;
  btnDetener.disabled = false;

  puntosJugador = 0;
  puntosComputadora = 0;

  puntosHTML[0] = 0;
  puntosHTML[1] = 0;

  divCartasJugador.innerHTML = '';
  divCartasComputadora.innerHTML = '';

};

btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();

  puntosJugador = puntosJugador + valorCarta(carta);
  puntosHTML[0].innerText = puntosJugador;

  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");

  divCartasJugador.append(imgCarta);

  if (puntosJugador > 21) {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
  }
});

btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoComputadora(puntosJugador);
});

btnNuevoJuego.addEventListener("click", () => {
  resetJuego();
});
