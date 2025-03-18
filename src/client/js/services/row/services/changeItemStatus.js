var sendItemStatus = async (userId, orderId, item) => {
  var response = await fetch('/itemstatus', {
    method: 'PATCH',
    body: JSON.stringify({ userId, orderId, item }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    var err = await response.text();
    alert('Ошибка при обновлении статуса предмета: ' + err);
    console.log('Ошибка при обновлении статуса предмета: ', err);
    return;
  }
};

var getCurrentOrderStatus = async (userId, orderId) => {
  var response = await fetch('/itemstatus' + '/' + userId + '/' + orderId);

  if (!response.ok) {
    throw new Error('Ошибка при получении статуса заказа');
  }

  var json = await response.json();

  return json.currentOrdeStatus;
};

var changeItemStatus = async (userId, orderId, items) => {
  var [value, status] = items.split(':::');

  var checkbox = document.createElement('input');
  checkbox.id = value;
  checkbox.type = 'checkbox';
  checkbox.name = 'item-status';

  if (!Boolean(+status)) {
    checkbox.checked = false;
  } else {
    checkbox.checked = true;
  }

  var orderStatus = await getCurrentOrderStatus(userId, orderId);

  if (orderStatus !== 'in-processing:1') {
    checkbox.disabled = true;
  }

  checkbox.addEventListener('change', async (e) => {
    e.preventDefault();

    if (checkbox.checked) {
      await sendItemStatus(userId, orderId, value + ':::' + 2);
    } else {
      await sendItemStatus(userId, orderId, value + ':::' + 0);
    }
  });

  var td = document.createElement('td');
  td.append(checkbox);

  return td;
};

export default changeItemStatus;
