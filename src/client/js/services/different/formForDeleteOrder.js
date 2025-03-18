import deleteOrder from '../../deleteOrder.js';

var createDeleteOrderForm = async (userId, orderId, orders) => {
  var button = document.createElement('button');
  button.type = 'submit';
  button.append('Удалить');

  button.addEventListener('click', async (e) => {
    e.preventDefault();

    var confirmDeletion = confirm('Удалить?');

    if (!confirmDeletion) return;

    var tbody = document.getElementById(orderId);

    var table = document.getElementById('table');
    table.removeChild(tbody);

    alert('Заказ был удален!');

    return deleteOrder(userId, orderId);
  });

  var form = document.createElement('form');
  form.action = '/orderinfo/delete/' + userId + '/' + orderId;
  form.className = 'form-for-delete-order';
  form.append(button);

  return form;
};

export default createDeleteOrderForm;
