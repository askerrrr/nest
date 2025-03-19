import allCheckboxesAreSelected from './allCheckboxesAreSelected.js';
import getLastUnmarkedCheckboxID from './getLastUnmarkedCheckboxID.js';

const obj = {};

var sendDeliveryStatus = async (userId, orderId, item) => {
  var result = await getLastUnmarkedCheckboxID('input[name=delivery-status]');

  if (result) {
    obj.lastUnmarkedCheckboxID = result;
  }

  var isAllCheckboxesAreSelected = await allCheckboxesAreSelected(
    'input[name=delivery-status]',
  );

  if (isAllCheckboxesAreSelected) {
    var isConfirmed = confirm(
      'Все товары доставлены на склад китая.\nИзменить статус заказа?',
    );

    if (isConfirmed) {
      delete obj?.lastUnmarkedCheckboxID;

      var response = await fetch('/deliverystatus', {
        method: 'PATCH',
        body: JSON.stringify({ userId, orderId, item }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status !== 200) {
        alert(
          'Ошибка при обновлении статуса выкупа\nили отправке новово статуса заказчику',
        );
        return;
      }

      delete obj.lastUnmarkedCheckboxID;

      return alert('Статус заказа именен');
    } else {
      return obj?.lastUnmarkedCheckboxID
        ? (document.getElementById(obj.lastUnmarkedCheckboxID).checked = false)
        : alert('Не удалось найти последний неотмеченный чекбокс');
    }
  } else {
    var response = await fetch('/deliverystatus', {
      method: 'PATCH',
      body: JSON.stringify({ userId, orderId, item }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status !== 200) {
      alert('Ошибка при обновлении статуса выкупа');
      return;
    }
  }
};

export default sendDeliveryStatus;
