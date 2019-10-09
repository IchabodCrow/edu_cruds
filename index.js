let state = {
  sportsman: [
    {
      name:   'Лионель Месси',
      sport:  'Футбол',
      salary: '$ 127 млн',
      id: '1',
    }, {
      name:   'Криштиану Роналду',
      sport:   'Футбол',
      salary:  '$ 109 млн',
      id: '2',
    }, {
      name:   'Неймар',
      sport:  'Футбол',
      salary: '$ 105 млн',
      id: '3',
    }, {
      name:   'Канело Альварес',
      sport:  'Бокс',
      salary: '$ 94 млн',
      id: '4',
    }, {
      name:   'Роджер Федерер',
      sport:  'Большой тенис',
      salary: '$ 93,4 млн',
      id: '5',
    }, {
      name:   'Рассел Уилсон',
      sport:  'Американский футбол',
      salary: '$ 89,5 млн',
      id: '6',
    }, {
      name:   'Аарон Роджерс',
      sport:  'Американский футбол',
      salary: '$ 89,3 млн',
      id: '7',
    }, {
      name:   'Леброн Джеймс',
      sport:  'Баскетбол',
      salary: '$ 89 млн',
      id: '8',
    }, {
      name:   'Стивен Карри',
      sport:  'Баскетбол',
      salary: '$ 79,8 млн',
      id: '9',
    }, {
      name:   'Кевин Дюран',
      sport:  'Баскетбол',
      salary: '$ 65,4 млн',
      id: '10',
    },
  ],
  sort: {
    field: 'name',
    direction: 'asc',
  },
  editingId: 0,
}
  // Отрисовываем таблицу

let lastId = 10;

const setState = (newState) => {
  if (state != newState) {
    state = newState;
    render();
  }
}

const renderRow = (sportsman) => {
  const isEditingRow = sportsman.id == state.editingId;
  return `<div>
  <div class="cell">${isEditingRow ? `<input class="inpReplace" value='${sportsman.name}'>` : sportsman.name}</div>
  <div class="cell">${isEditingRow ? `<input class="inpReplace" value='${sportsman.sport}'>` : sportsman.sport}</div>
  <div class="cell">${isEditingRow ? `<input class="inpReplace" value='${sportsman.salary}'>` : sportsman.salary}</div>
  <div class="cell">${sportsman.id}</div>
  <button class="delSportsman" data-id='${sportsman.id}'>Удалить спортсмена</button>
  ${ isEditingRow ?
     `<button class="save" data-id='${sportsman.id}'> Сохранить</button>`
      : `<button class="upDate" data-id='${sportsman.id}'> Редактировать</button>`}
  </div>`;
};

const renderTable = () => `
  ${renderHeaders()}
  ${state.sportsman.map(renderRow).join('')}
`

const renderHeaders = () => {
  return `<div class="table-header">
  <div class="cell">Имя <button class="sortBut"> ${state.sort.direction === 'desc' ? "Я-А" :"А-Я"}</button"></div>
  <div class="cell">Спорт</div>
  <div class="cell">Заработок</div>
  <div class="cell">Номер</div>
  </div>`;
}

const render = () => {
  document.getElementsByClassName('table')[0].innerHTML = renderTable();
}

window.onload = function() {
  render();
};

// Добавляем новых спортсменов

function addSportsman () {
    lastId++;
  let newObject = {
      name:   document.getElementsByClassName('nameInp')[0].value,
      sport:  document.getElementsByClassName('sportInp')[0].value,
      salary: document.getElementsByClassName('solaryInp')[0].value,
      id:  lastId,
  };
  setState({...state, sportsman : [ newObject, ...state.sportsman ]});
};

document.getElementsByClassName('but')[0].addEventListener('click', addSportsman);

// Методы сортировки

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
// Работа с кнопками

document.getElementsByTagName('body')[0].addEventListener('click', function (event) {
   if (event.target.matches('.sortBut')) choiseMehtodSort();
   if (event.target.matches('.delSportsman')) deleteSportsman(event.target.dataset.id);
   if (event.target.matches('.upDate')) replaceInp(event.target.dataset.id);
   if (event.target.matches('.save')) saveSportsman(event.target.dataset.id);
}, false);

// Удаление строк

const deleteSportsman = (sportsmanId) => {
  const sportsman = state.sportsman.filter(function(obj) {
    return obj.id != sportsmanId;
  });
  setState({...state, sportsman});
};

// Редактирование строк

const replaceInp = (editingId) => {
  setState({...state, editingId});
};

const saveSportsman = (id) => {
  const newSportsman = {
      name: document.getElementsByClassName('inpReplace')[0].value,
      sport: document.getElementsByClassName('inpReplace')[1].value,
      salary: document.getElementsByClassName('inpReplace')[2].value,
      id,
  }
  const sportsman = state.sportsman.map(s => s.id == id ? newSportsman : s);
  setState({...state, sportsman, editingId: 0})
}

//
