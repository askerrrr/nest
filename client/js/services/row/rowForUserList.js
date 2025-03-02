import getUserId from './services/link.js';
import getUserName from './services/userName.js';
import getFirstName from './services/firstName.js';
import getOrderInfo from './services/orderInfo.js';

export default async function rowForUserList(order) {
  var userId = order.userId;
  var firstName = order.firstName;
  var userName = order.userName;

  var tr = document.createElement('tr');

  var firstNames = await getFirstName(firstName);
  var userNames = await getUserName(userName);
  var userIDs = await getUserId(userId);
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
}
