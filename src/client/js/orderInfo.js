import rowForSingle from './services/row/rowForSingle.js';
import rowForMultiple from './services/row/rowForMultiple.js';

var getOrderInfo = async () => {
  var pathParts = window.location.pathname.split('/');

  var userId = pathParts.at(-2);
  var orderId = pathParts.at(-1);

  var url = '/orderinfo/api/order/' + userId + '/' + orderId;

  var response = await fetch(url);

  if (!response.ok) {
    var err = await response.text();
    alert('error: ', err);
    return;
  }

  var order = await response.json();

  return order.type == 'single'
    ? await rowForSingle(order)
    : await rowForMultiple(order);
};

getOrderInfo().catch((err) => alert('error: ', err));
