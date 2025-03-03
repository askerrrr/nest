import getPhone from './services/getPhone.js';
import getOrderId from './services/getOrderId.js';
import closePopUp from '../different/closePopUp.js';
import getUserInfo from './services/getUserInfo.js';
import getOrderDate from './services/getOrderDate.js';
import createTableHead from './services/tableHead.js';
import createDownloadLink from './services/downloadLink.js';
import formForOpenPopUp from '../different/formForOpenPopUp.js';
import createXlsxFileLink from './services/createXlsxFileLink.js';
import createDeleteOrderForm from '../different/formForDeleteOrder.js';
import getCurrentOrderStatus from './services/getCurrentOrdeStatus.js';
import formForSetOrderStatus from '../different/formForSetOrderStatus.js';
import createBackToOrdersButton from './services/createBackToOrdersButton.js';

var rowForMultiple = async (orders) => {
  var orderId = orders.order.id;
  var phone = orders.order.phone;
  var userId = orders.order.userId;
  var orderDate = orders.order.date;
  var status = orders.order.orderStatus;

  var tr = document.createElement('tr');

  tr.append(
    await getOrderId(orderId),
    await getOrderDate(orderDate),
    await createXlsxFileLink(userId, orderId),
    await getPhone(phone),
    await getCurrentOrderStatus(status),
    await createDownloadLink(userId, orderId),
  );

  var tbody = document.createElement('tbody');
  tbody.append(tr);
  tbody.id = orderId;

  var thead = createTableHead(orders);

  var table = document.getElementById('table');
  table.append(thead, tbody);

  await closePopUp(orderId);
  await formForSetOrderStatus(userId, orderId);

  var userInfo = await getUserInfo(userId);
  var backToOrdersButton = await createBackToOrdersButton(userId);

  var openPopUp = await formForOpenPopUp(userId, orderId);
  var formForDeleteOrder = await createDeleteOrderForm(userId, orderId);

  var body = document.getElementById('orderInfo');
  body.append(
    userInfo,
    backToOrdersButton,
    openPopUp,
    table,
    formForDeleteOrder,
  );

  return body;
};

export default rowForMultiple;
