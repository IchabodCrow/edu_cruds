let state = {
  sportsman: [
    {
      name:   'Лионель Месси',
      sport:  'Футбол',
      salary: '$ 127 млн',
    }, {
      name:   'Криштиану Роналду',
      sport:   'Футбол',
      salary:  '$ 109 млн',
    }, {
      name:   'Неймар',
      sport:  'Футбол',
      salary: '$ 105 млн',
    }, {
      name:   'Канело Альварес',
      sport:  'Бокс',
      salary: '$ 94 млн',
    }, {
      name:   'Роджер Федерер',
      sport:  'Большой тенис',
      salary: '$ 93,4 млн',
    }, {
      name:   'Рассел Уилсон',
      sport:  'Американский футбол',
      salary: '$ 89,5 млн',
    }, {
      name:   'Аарон Роджерс',
      sport:  'Американский футбол',
      salary: '$ 89,3 млн',
    }, {
      name:   'Леброн Джеймс',
      sport:  'Баскетбол',
      salary: '$ 89 млн',
    }, {
      name:   'Стивен Карри',
      sport:  'Баскетбол',
      salary: '$ 79,8 млн',
    }, {
      name:   'Кевин Дюран',
      sport:  'Баскетбол',
      salary: '$ 65,4 млн',
    },
  ],
  sort: {
    field: 'name',
    direction: 'asc',
  }
}

const setState = (newState) => {
  if (state != newState) {
    state = newState;
    render();
  }
}

const renderRow = (sportsman) => {
  return `<div>
  <div class="cell">${sportsman.name}</div>
  <div class="cell">${sportsman.sport}</div>
  <div class="cell">${sportsman.salary}</div>
  </div>`;
}

const renderTable = () => `
  ${renderHeaders()}
  ${state.sportsman.map(renderRow).join('')}
`

const renderHeaders = () => {
  return `<div class="table-header">
  <div class="cell">Имя <button class="sortBut">А-Я</button"></div>
  <div class="cell">Спорт</div>
  <div class="cell">Заработок</div>
  </div>`;
}

const render = () => {
  document.getElementsByClassName('table')[0].innerHTML = renderTable();
}

window.onload = function() {
  render();
};

function addSportsman () {

  let newObject = {
      name:   document.getElementsByClassName('nameInp')[0].value,
      sport:  document.getElementsByClassName('sportInp')[0].value,
      salary: document.getElementsByClassName('solaryInp')[0].value,
  };
  setState({...state, sportsman : [ newObject, ...state.sportsman ]});
};

document.getElementsByClassName('but')[0].addEventListener('click', addSportsman);

function sortString() {
  const sportsman = [...state.sportsman.sort((a, b) => a.name < b.name ? 1 : -1)];
  const sort = {...state.sort, direction: 'asc' };
  setState({...state, sportsman, sort});
}

function sortStringRevers() {
  const sportsman = [...state.sportsman.sort((a, b) => a.name > b.name ? 1 : -1)];
  const sort = {...state.sort, direction: 'desc' };
  setState({...state, sportsman, sort});
}

function choiseMehtodSort() {
    if (state.sort.direction === 'desc') {
      sortString();
    } else {
      sortStringRevers();
    }
}

document.getElementsByTagName('body')[0].addEventListener('click', function (event) {
   if (!event.target.matches('.sortBut')) return;
   choiseMehtodSort();
}, false);
