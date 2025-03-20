import rowForListOfActiveOrders from './services/row/rowForListOfActiveOrders.js';

var getOrderList = async () => {
  var pathParts = window.location.pathname.split('/');
  var userId = pathParts.at(-1);

  var url = '/orderinfo/api/' + userId;

  var response = await fetch(url);

  if (!response.ok) {
    var err = await response.text();
    alert('error: ', response.status);
    return;
  }

  var orders = await response.json();

  await rowForListOfActiveOrders(orders);
};

getOrderList().catch((err) => alert('error: ', err));
