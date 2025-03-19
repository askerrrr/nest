import getPhone from "./services/getPhone.js";
import openImage from "./services/openImage.js";
import getItemUrl from "./services/getItemUrl.js";
import getOrderId from "./services/getOrderId.js";
import getUserInfo from "./services/getUserInfo.js";
import closePopUp from "../checkbox/closePopUp.js";
import getOrderDate from "./services/getOrderDate.js";
import getDescription from "./services/getDescription.js";
import formForOpenPopUp from "../checkbox/formForOpenPopUp.js";
import createDeleteOrderForm from "../different/formForDeleteOrder.js";
import createDownloadFileLink from "./services/createDownloadFileLink.js";
import createTableHeadForOrder from "./services/createTableHeadForOrder.js";
import createBackToOrdersButton from "./services/createBackToOrdersButton.js";
import getOrderStatusDescription from "./services/getOrderStatusDescription.js";
import createFormForSetOrderStatus from "../checkbox/createFormForSetOrderStatus.js";

var rowForSingle = async (order) => {
  var { id, date, userId, phone, itemUrl, orderStatus, description } = order;

  var tr = document.createElement("tr");

  tr.append(
    await getOrderId(id),
    await getOrderDate(date),
    await getPhone(phone),
    await openImage(userId, id),
    await getItemUrl(itemUrl),
    await getDescription(description),
    await getOrderStatusDescription(orderStatus),
    await createDownloadFileLink(userId, id)
  );

  var tbody = document.createElement("tbody");
  tbody.append(tr);
  tbody.id = id;

  var thead = createTableHeadForOrder(order);

  var table = document.getElementById("table");
  table.append(thead, tbody);

  await closePopUp(id);
  await createFormForSetOrderStatus(userId, id);

  var userInfo = await getUserInfo(userId);
  var openPopUp = await formForOpenPopUp(userId, id);
  var backToOrdersButton = await createBackToOrdersButton(userId);
  var formForDeleteOrder = await createDeleteOrderForm(userId, id);

  var body = document.getElementById("orderInfo");
  body.append(
    userInfo,
    backToOrdersButton,
    openPopUp,
    table,
    formForDeleteOrder
  );

  return body;
};

export default rowForSingle;
