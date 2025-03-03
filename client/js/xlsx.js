import e from 'express';
import rowForXLSX from './services/row/rowForXLSX.js';

async function getXlsxDataInTable() {
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

    // if (json.msg == 'ENOENT: no such file or directory') {
    //   alert('Не удалось открыть файл.\nОшибка: ' + err.message);
    //   console.log(err.message);
    //   window.location.href = '/orderinfo/orders/order/' + orderId;
    // }

    await rowForXLSX(json, userId, orderId);
  } catch (err) {
    if (err.message === 'Unexpected end of JSON input') {
      alert('Не удалось прочитать файл\nОшибка: ' + err.message);
      window.location.href = '/orderinfo/orders/order/' + orderId;
    }
    // else if (err.message === 'ENOENT: no such file or directory') {
    //   alert('Не удалось открыть файл.\nОшибка: ' + err.message);
    //   console.log(err.message);
    //   window.location.href = '/orderinfo/orders/order/' + orderId;
    //  }
  }
}

getXlsxDataInTable();
