import sendOrderStatus from './sendOrderStatus.js';

var createFormForSetOrderStatus = async (userId, orderId) => {
  return document
    .getElementById('submit-order-status')
    .addEventListener('click', async (e) => {
      e.preventDefault();

      var btn = document.getElementById('button-' + orderId);
      var fieldset = document.getElementById('fieldset-' + orderId);

      var checkBox = document.querySelector('input[name=order-status]:checked');

      if (!checkBox) {
        alert('Вы ничего не выбрали');
        return;
      }

      var idOfMarkedCheckBox = checkBox.id;
      var orderStatus = checkBox.value + ':' + idOfMarkedCheckBox;

      document.getElementById('submit-order-status').disabled = true;

      var successfullResponse = await sendOrderStatus(
        userId,
        orderId,
        orderStatus,
      );

      if (!successfullResponse) {
        alert('Ошибка при обновлении статуса. Попробуйте еще раз.');

        fieldset?.remove();
        window.dialog.close();
        document.getElementById('submit-order-status').disabled = false;
        btn.disabled = false;

        return;
      } else {
        alert('Статус успешно обновлен');
        fieldset?.remove();
        window.dialog.close();
        document.getElementById('submit-order-status').disabled = false;
        btn.disabled = false;
        window.location.reload();
      }
    });
};

export default createFormForSetOrderStatus;
