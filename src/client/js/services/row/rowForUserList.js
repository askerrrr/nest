import getUserName from "./services/userName.js";
import getOrderInfo from "./services/orderInfo.js";
import getFirstName from "./services/getFirstName.js";
import createAllOrdersLink from "./services/createAllOrdersLink.js";

var rowForUserList = async (order) => {
  var { userId, firstName, userName } = order;

  var tr = document.createElement("tr");

  tr.append(
    await getFirstName(firstName),
    await getUserName(userName),
    await createAllOrdersLink(userId),
    await getOrderInfo(order)
  );

  var tbody = document.createElement("tbody");
  tbody.append(tr);
  tbody.id = userId;

  var table = document.getElementById("homepage");
  table.append(tbody);

  var body = document.getElementById("body");
  body.append(table);

  return body;
};

export default rowForUserList;
