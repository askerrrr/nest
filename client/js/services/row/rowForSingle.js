import getPhone from './services/getPhone.js';
import openImage from './services/openImage.js';
import getItemUrl from './services/getItemUrl.js';
import getOrderId from './services/getOrderId.js';
import getUserInfo from './services/getUserInfo.js';
import closePopUp from '../checkbox/closePopUp.js';
import getOrderDate from './services/getOrderDate.js';
import getDescription from './services/getDescription.js';
import formForOpenPopUp from '../checkbox/formForOpenPopUp.js';
import getCurrentOrderStatus from './services/getCurrentOrdeStatus.js';
import createDeleteOrderForm from '../different/formForDeleteOrder.js';
import createDownloadFileLink from './services/createDownloadFileLink.js';
import formForSetOrderStatus from '../checkbox/formForSetOrderStatus.js';
import createTableHeadForOrder from './services/createTableHeadForOrder.js';
import createBackToOrdersButton from './services/createBackToOrdersButton.js';

export default async function rowForSingle(orders) {
  var orderId = orders.order.id;
  var phone = orders.order.phone;
  var userId = orders.order.userId;
  var orderDate = orders.order.date;
  var itemUrl = orders.order.itemUrl;
  var status = orders.order.orderStatus;
  var description = orders.order.description;

  var tr = document.createElement('tr');

  tr.append(
    await getOrderId(orderId),
    await getOrderDate(orderDate),
    await getPhone(phone),
    await openImage(userId, orderId),
    await getItemUrl(itemUrl),
    await getDescription(description),
    await getCurrentOrderStatus(status),
    await createDownloadFileLink(userId, orderId),
  );

  var tbody = document.createElement('tbody');
  tbody.append(tr);
  tbody.id = orderId;

  var thead = createTableHeadForOrder(orders);

  var table = document.getElementById('table');
  table.append(thead, tbody);

  await closePopUp(orderId);
  await formForSetOrderStatus(userId, orderId);

  var userInfo = await getUserInfo(userId);
  var openPopUp = await formForOpenPopUp(userId, orderId);
  var backToOrdersButton = await createBackToOrdersButton(userId);
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
}
