let state = {
  sportsman: [{name:   'Лионель Месси',
   sport:  'Футбол',
   salary: '$ 127 млн',
},
  {name:   'Криштиану Роналду',
  sport:   'Футбол',
  salary:  '$ 109 млн',
},
  {name:   'Неймар',
   sport:  'Футбол',
   salary: '$ 105 млн',
},
  {name:   'Канело Альварес',
   sport:  'Бокс',
   salary: '$ 94 млн',
},
  {name:   'Роджер Федерер',
   sport:  'Большой тенис',
   salary: '$ 93,4 млн',
},
  {name:   'Рассел Уилсон',
   sport:  'Американский футбол',
   salary: '$ 89,5 млн',
},
  {name:   'Аарон Роджерс',
   sport:  'Американский футбол',
   salary: '$ 89,3 млн',
},
  {name:   'Леброн Джеймс',
   sport:  'Баскетбол',
   salary: '$ 89 млн',
},
{name:   'Стивен Карри',
 sport:  'Баскетбол',
 salary: '$ 79,8 млн',
},
  {name:   'Кевин Дюран',
   sport:  'Баскетбол',
   salary: '$ 65,4 млн',
},],
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
  return '<div>' +
  '<div id="first">' + sportsman.name + '</div>' +
  '<div id="second">' + sportsman.sport + '</div>' +
  '<div id="three">' + sportsman.salary + '</div>' +
  '</div>';
}

const renderTable = () => state.sportsman.map(renderRow).join('');

function addSportsman () {

  let newObject = {
      name:   document.getElementById('nameInp').value,
      sport:  document.getElementById('sportInp').value,
      salary: document.getElementById('solaryInp').value,
  };
  setState({...state, sportsman : [ newObject, ...state.sportsman ]});
};
let but = document.getElementById('but');

but.addEventListener('click', addSportsman);

const renderHeaders = () => {
  return '<input type="button" id="sortBut" value="А-Я">';
  '<div>' +
  '<div>' + 'Имя' + '</div>' +
  '<div>' + 'Спорт' + '</div>' +
  '<div>' + 'Заработок' + '</div>' +
  '</div>';

}

function sortString() {
  setState({...state, sportsman : [...state.sportsman.sort((a, b) => a.name > b.name ? 1 : -1)]}) ;
  document.getElementById('sortBut').value = "Я-А";
}

function sortStringRevers() {
  setState({...state, sportsman : [...state.sportsman.sort((a, b) => a.name < b.name ? 1 : -1)]}) ;
  document.getElementById('sortBut').value = "А-Я";
}

function choiseMehtodSort () {
    if ( sortBut.value === "А-Я") {
      sortString();
    } else {
      sortStringRevers();
    }
}

let sortBut = document.getElementById('sortBut');
// sortBut.addEventListener('click', choiseMehtodSort );

const render = () => {
  document.getElementById('container').innerHTML = renderHeaders() + renderTable() + '</div>';
}
window.onload = function() {
  render();
};
