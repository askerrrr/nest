import getUserName from './services/userName.js';
import getOrderInfo from './services/orderInfo.js';
import getFirstName from './services/getFirstName.js';
import createAllOrdersLink from './services/createAllOrdersLink.js';

var rowForUserList = async (order) => {
  var userId = order.userId;
  var firstName = order.firstName;
  var userName = order.userName;

  var tr = document.createElement('tr');

  var firstNames = await getFirstName(firstName);
  var userNames = await getUserName(userName);
  var userIDs = await createAllOrdersLink(userId);
  var userInfo = await getOrderInfo(order);

  tr.append(firstNames, userNames, userIDs, userInfo);

  var tbody = document.createElement('tbody');
  tbody.append(tr);
  tbody.id = userId;

  var table = document.getElementById('homepage');
  table.append(tbody);

  var body = document.getElementById('body');
  body.append(table);

  return body;
};

export default rowForUserList;
