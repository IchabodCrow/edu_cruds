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
  }, /*Добавление новых спортсменов*/
  addSportsman: function addSportsman () {
      lastId++;
    let newObject = {
        name:   $('.nameInp').val(),
        sport:  $('.sportInp').val(),
        salary: $('.solaryInp').val(),
        id:  lastId,
    };
    setState({...state, sportsman : [ newObject, ...state.sportsman ]});
  }, /* Сортировака спортсменов*/
  sortString: function sortString() {
    const sportsman = [...state.sportsman.sort((a, b) => a.name < b.name ? 1 : -1)];
    const sort = {...state.sort, direction: 'asc' };
    setState({...state, sportsman, sort});
  },
  sortStringRevers: function sortStringRevers() {
    const sportsman = [...state.sportsman.sort((a, b) => a.name > b.name ? 1 : -1)];
    const sort = {...state.sort, direction: 'desc' };
    setState({...state, sportsman, sort});
  },
  choiseMehtodSort: function choiseMehtodSort() {
      if (state.sort.direction === 'desc') {
        state.sortString();
      } else {
        state.sortStringRevers();
      }
  }, /* Удаление строк*/
  deleteSportsman: function deleteSportsman(sportsmanId) {
    const sportsman = state.sportsman.filter(function(obj) {
      return obj.id != sportsmanId;
    });
    setState({...state, sportsman});
  }, /* Редактирование строк*/
  replaceInp: function replaceInp(editingId) {
    setState({...state, editingId});
  }, /* Сохранение строк*/
  saveSportsman: function saveSportsman(id) {
    const newSportsman = {
        name: $('.inpReplace').val(),
        sport: $('.inpReplace').val(),
        salary: $('.inpReplace').val(),
        id: $('.inpReplace').val(),
    }
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
  $('.table').html(renderTable());

}

window.onload = function() {
  render();
};

$('.but').bind('click', state.addSportsman);

// Работа с кнопками

$('body').on('click','.sortBut', state.choiseMehtodSort);
$('body').on('click','.delSportsman', () => state.deleteSportsman(event.target.dataset.id));
$('body').on('click','.upDate', () => state.replaceInp(event.target.dataset.id));
$('body').on('click','.save', () => state.saveSportsman(event.target.dataset.id));

  const sportsman = state.sportsman.map(s => s.id == id ? newSportsman : s);
  setState({...state, sportsman, editingId: 0})
