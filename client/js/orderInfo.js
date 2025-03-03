import rowForSingle from './services/row/rowForSingle.js';
import rowForMultiple from './services/row/rowForMultiple.js';

async function getOrderInfo() {
  try {
    var pathParts = window.location.pathname.split('/');
    var userId = pathParts.at(-1);

    var url = '/orderinfo/api/order/' + userId;

    var response = await fetch(url);

    if (!response.ok) {
      var err = await response.text();
      console.log(err);
      return;
    }

    var orders = await response.json();

    return orders.order.type == 'single'
      ? await rowForSingle(orders)
      : await rowForMultiple(orders);
  } catch (err) {
    console.log(err);
  }
}

getOrderInfo();
