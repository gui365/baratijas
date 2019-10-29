// ARRAYS
export const orden = ['Primera', 'Segunda', 'Tercera', 'Cuarta', 'Quinta', 'Sexta'];

// FUNCTIONS
export const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const asignarIds = (listaMezclada) => {
  return listaMezclada.map((b, i) => {
    b.id = (i + 1).toString();
    return b;
  })
};

export const filterOutPlayer = (array, playerIndex) => {
  const chosenPlayer = array[playerIndex];
  return array.filter(p => !(p.nombre === chosenPlayer.nombre));
};