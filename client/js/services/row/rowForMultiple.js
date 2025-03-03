import getPhone from './services/getPhone.js';
import renderXLSX from './services/renderXLSX.js';
import getOrderId from './services/getOrderId.js';
import closePopUp from '../different/closePopUp.js';
import getUserInfo from './services/getUserInfo.js';
import getOrderDate from './services/getOrderDate.js';
import backToOrders from './services/backToOrders.js';
import createTableHead from './services/tableHead.js';
import createDownloadLink from './services/downloadLink.js';
import formForOpenPopUp from '../different/formForOpenPopUp.js';
import createDeleteOrderForm from '../different/formForDeleteOrder.js';
import getCurrentOrderStatus from './services/getCurrentOrdeStatus.js';
import formForSetOrderStatus from '../different/formForSetOrderStatus.js';

export default async function rowForMultiple(orders) {
  var orderId = orders.order.id;
  var phone = orders.order.phone;
  var userId = orders.order.userId;
  var orderDate = orders.order.date;
  var status = orders.order.orderStatus;

  var tr = document.createElement('tr');

  tr.append(
    await getOrderId(orderId),
    await getOrderDate(orderDate),
    await renderXLSX(userId, orderId),
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
  var buttonForbackToOrders = await backToOrders(userId);

  var openPopUp = await formForOpenPopUp(userId, orderId);
  var formForDeleteOrder = await createDeleteOrderForm(userId, orderId);

  var body = document.getElementById('orderInfo');
  body.append(
    userInfo,
    buttonForbackToOrders,
    openPopUp,
    table,
    formForDeleteOrder,
  );

  return body;
}
