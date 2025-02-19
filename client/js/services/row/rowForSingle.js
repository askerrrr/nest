import renderDate from "./services/date.js";
import renderPhone from "./services/phone.js";
import openImage from "./services/openImage.js";
import renderOrderId from "./services/orderId.js";
import renderItemUrl from "./services/itemUrl.js";
import getUserInfo from "./services/getUserInfo.js";
import closePopUp from "../different/closePopUp.js";
import backToOrders from "./services/backToOrders.js";
import renderTableHead from "./services/tableHead.js";
import renderDescription from "./services/description.js";
import renderDownloadLink from "./services/downloadLink.js";
import formForOpenPopUp from "../different/formForOpenPopUp.js";
import createDeleteOrderForm from "../different/formForDeleteOrder.js";
import renderCurrentOrderStatus from "./services/currentOrdeStatus.js";
import formForSetOrderStatus from "../different/formForSetOrderStatus.js";

export default async function rowForSingle(orders) {
  var orderId = orders.order.id;
  var phone = orders.order.phone;
  var userId = orders.order.userId;
  var orderDate = orders.order.date;
  var itemUrl = orders.order.itemUrl;
  var status = orders.order.orderStatus;
  var description = orders.order.description;

  var tr = document.createElement("tr");
  tr.append(
    renderOrderId(orderId),
    renderDate(orderDate),
    renderPhone(phone),
    openImage(userId, orderId),
    renderItemUrl(itemUrl),
    renderDescription(description),
    renderCurrentOrderStatus(status),
    renderDownloadLink(userId, orderId)
  );

  var tbody = document.createElement("tbody");
  tbody.append(tr);
  tbody.id = orderId;

  var thead = renderTableHead(orders);

  var table = document.getElementById("table");
  table.append(thead, tbody);

  await closePopUp(orderId);
  await formForSetOrderStatus(userId, orderId);

  var userInfo = await getUserInfo(userId);
  var buttonForbackToOrders = await backToOrders(userId);
  var openPopUp = await formForOpenPopUp(userId, orderId);
  var formForDeleteOrder = await createDeleteOrderForm(userId, orderId);

  var body = document.getElementById("orderInfo");
  body.append(
    userInfo,
    buttonForbackToOrders,
    openPopUp,
    table,
    formForDeleteOrder
  );

  return body;
}
