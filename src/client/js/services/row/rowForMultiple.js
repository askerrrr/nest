import getPhone from "./services/getPhone.js";
import getOrderId from "./services/getOrderId.js";
import closePopUp from "../checkbox/closePopUp.js";
import getUserInfo from "./services/getUserInfo.js";
import getOrderDate from "./services/getOrderDate.js";
import formForOpenPopUp from "../checkbox/formForOpenPopUp.js";
import createXlsxFileLink from "./services/createXlsxFileLink.js";
import createDeleteOrderForm from "../different/formForDeleteOrder.js";
import createDownloadFileLink from "./services/createDownloadFileLink.js";
import createTableHeadForOrder from "./services/createTableHeadForOrder.js";
import createBackToOrdersButton from "./services/createBackToOrdersButton.js";
import getOrderStatusDescription from "./services/getOrderStatusDescription.js";
import createFormForSetOrderStatus from "../checkbox/createFormForSetOrderStatus.js";

var rowForMultiple = async (order) => {
  var { userId, id, orderStatus, phone, date } = order;

  var tr = document.createElement("tr");

  tr.append(
    await getOrderId(id),
    await getOrderDate(date),
    await createXlsxFileLink(userId, id),
    await getPhone(phone),
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
  var backToOrdersButton = await createBackToOrdersButton(userId);

  var openPopUp = await formForOpenPopUp(userId, id);
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

export default rowForMultiple;
