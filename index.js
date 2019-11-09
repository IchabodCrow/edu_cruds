function CRUD(items, rootNode) {

  const state  = {
    items,
    sort: {
      field: 'name',
      direction: 'asc',
    },
    editingId: 0,
  };

  let lastId = 10;

  const crud = {

    state,
    setState: (newState) => {
      if (crud.state != newState) {
        crud.state = newState;
        crud.render();
      };
    },

    /*Добавление спорсменов*/

    addSportsman: function addSportsman () {
        lastId++;
      let newObject = {
          name:   $('.nameInp').val(),
          sport:  $('.sportInp').val(),
          salary: $('.solaryInp').val(),
          id:  lastId,
      };
      crud.setState({...crud.state, items : [ newObject, ...crud.state.items ]});
    },

    /* Сортировака спортсменов*/

    sortString: function sortString() {
      const items = [...crud.state.items.sort((a, b) => a.name < b.name ? 1 : -1)];
      const sort = {...crud.sort, direction: 'asc' };
      crud.setState({...crud.state, items, sort});
    },
    sortStringRevers: function sortStringRevers() {
      const items = [...crud.state.items.sort((a, b) => a.name > b.name ? 1 : -1)];
      const sort = {...crud.sort, direction: 'desc' };
      crud.setState({...crud.state, items, sort});
    },
    choiseMehtodSort: function choiseMehtodSort() {
        if (crud.state.sort.direction === 'desc') {
          crud.sortString();
        } else {
          crud.sortStringRevers();
        }
    },

    /* Удаление строк*/

    deleteSportsman: function deleteSportsman(sportsmanId) {
      const items = crud.state.items.filter(function(obj) {
        return obj.id != sportsmanId;
      });
      crud.setState({...crud.state, items});
    },

    /* Редактирование строк*/

    replaceInp: function replaceInp(editingId) {
      crud.setState({...crud.state, editingId});
    }, /* Сохранение строк*/
    saveItems: function saveSportsman(id) {
      const newSportsman = {
          name: $('.inpReplace1').val(),
          sport: $('.inpReplace2').val(),
          salary: $('.inpReplace3').val(),
          id,
      };
      const items = crud.state.items.map(s => s.id == id ? newSportsman : s);
      crud.setState({...crud.state, items, editingId: 0})
    },

    // Отрисовываем таблицу

    renderRow: (items) => {
      const isEditingRow = items.id == crud.state.editingId;
      return `<div>
      <div class="cell">${isEditingRow ? `<input class="inpReplace1" value='${items.name}'>` : items.name}</div>
      <div class="cell">${isEditingRow ? `<input class="inpReplace2" value='${items.sport}'>` : items.sport}</div>
      <div class="cell">${isEditingRow ? `<input class="inpReplace3" value='${items.salary}'>` : items.salary}</div>
      <div class="cell">${items.id}</div>
      <button class="delSportsman" data-id='${items.id}'>Удалить спортсмена</button>
      ${ isEditingRow ?
         `<button class="save" data-id='${items.id}'> Сохранить</button>`
          : `<button class="upDate" data-id='${items.id}'> Редактировать</button>`}
      </div>`;
    },

    renderTable: () => `
      ${crud.renderHeaders()}
      ${crud.state.items.map(crud.renderRow).join('')}
    `,

    renderHeaders: () => {
      return `<div class="table-header">
      <div class="cell">Имя <button class="sortBut"> ${crud.state.sort.direction === 'desc' ? "Я-А" :"А-Я"}</button"></div>
      <div class="cell">Спорт</div>
      <div class="cell">Заработок</div>
      <div class="cell">Номер</div>
      </div>`;
    },

    render: () => {
      $('.table').html(crud.renderTable);
    },
  }; // <-------crud

  // Работа с кнопками

  $('.but').bind('click', crud.addSportsman);
  $('body').on('click','.sortBut', crud.choiseMehtodSort);
  $('body').on('click','.delSportsman', () => crud.deleteSportsman(event.target.dataset.id));
  $('body').on('click','.upDate', () => crud.replaceInp(event.target.dataset.id));
  $('body').on('click','.save', () => crud.saveItems(event.target.dataset.id));

  return crud;
}; //<---------Crud();

const items = [
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
];

window.onload = function() {
  const table = document.getElementsByClassName('table')[0];
  const crud = CRUD(items,table);
  crud.render();
};
