import rowForCompletedOrders from './services/row/rowForCompletedOrders.js';

var getoCompletedOrders = async () => {
  var pathParts = window.location.pathname.split('/');

  var userId = pathParts.at(-1);

  var url = '/orderinfo/api/completed/' + userId;

  var response = await fetch(url);

  var { userId, orders } = await response.json();

  await rowForCompletedOrders(userId, orders);
};

getoCompletedOrders().catch((err) => alert('error: ', err));
