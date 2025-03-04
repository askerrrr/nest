import rowForXLSX from './services/row/rowForXLSX.js';

var getXlsxDataInTable = async () => {
  try {
    var pathParts = window.location.pathname.split('/');

    var userId = pathParts[2];
    var orderId = pathParts[3];

    var url = '/xlsx/api/' + userId + '/' + orderId;

    var response = await fetch(url);

    if (!response.ok) {
      var err = await response.text();
      console.log(err);
      return;
    }

    var json = await response.json();

    await rowForXLSX(json, userId, orderId);
  } catch (err) {
    if (err.message === 'Unexpected end of JSON input') {
      alert('Не удалось прочитать файл\nОшибка: ' + err.message);
      window.location.href = '/orderinfo/orders/order/' + orderId;
    }
  }
};

getXlsxDataInTable();
