var getCurrentOrderStatus = async (status) => {
  var td = document.createElement('td');

  let currentStatus = status.split(':')[0];

  switch (currentStatus) {
    case 'not-accepted-for-processing':
      currentStatus === 'not-accepted-for-processing';
      td.append('Не взят в обработку');
      td.style.color = '#54ff00';
      break;
    case 'in-processing':
      currentStatus === 'in-processing';
      td.append('Взят в обработку');
      td.style.color = '#00c4ff';
      break;
    case 'purchased':
      currentStatus === 'purchased';
      td.append('Выкуплен');
      td.style.color = '#edff01';
      break;
    case 'china-warehouse':
      currentStatus === 'china-warehouse';
      td.append('Прибыл на склад в Китае');
      td.style.color = '#edff01';
      break;
    case 'on-the-way':
      currentStatus === 'on-the-way';
      td.append('В пути в Москву');
      td.style.color = '#c19aff';
      break;
    case 'awaiting-receipt':
      currentStatus === 'awaiting-receipt';
      td.append('Ожидает получения');
      td.style.color = '#d201ff';
      break;
    case 'order-is-completed':
      currentStatus === 'order-is-completed';
      td.append('Завершен');
      td.style.color = '#ff0000';
      break;
  }
  return td;
};

export default getCurrentOrderStatus;
