import getTotalSum from './services/getTotalSum.js';
import getPriceOfEach from './services/getItemPrice.js';
import getUrlFromXLSX from './services/getUrlFromXLSX.js';
import getSizeFromXLSX from './services/getSizeFromXLSX.js';
import { getItemId, setItemId } from './services/ItemId.js';
import changeItemStatus from './services/changeItemStatus.js';
import getImageFromXLSX from './services/getImageFromXLSX.js';
import getQuantityFromXLSX from './services/getQuantityFromXLSX.js';
import createTableHeadToXLSX from './services/createTableHeadToXLSX.js';
import createBackToOrderButton from './services/createBackToOrderButton.js';

var rowForXLSX = async (sheetData, userId, orderId) => {
  var thead = createTableHeadToXLSX();
  var tbody = document.createElement('tbody');
  var table = document.createElement('table');

  sheetData.forEach(async (item, index) => {
    var img = await getImageFromXLSX(item.img);
    var url = await getUrlFromXLSX(item.url);
    var qty = await getQuantityFromXLSX(item.qty);
    var size = await getSizeFromXLSX(item.size);
    var itemId = await getItemId(item.id);
    var itemPrice = await getPriceOfEach(item.itemPrice);
    var totalSum = await getTotalSum(item.totalSum);
    var itemStatus = await changeItemStatus(userId, orderId, item.item);

    var tr = document.createElement('tr');
    tr.append(
      img,
      url,
      qty,
      size,
      itemPrice,
      totalSum,
      itemStatus,
      itemId,
      await setItemId(userId, orderId, index),
    );

    tbody.append(tr);
    return tbody;
  });

  table.append(thead, tbody);

  var backToOrderButton = await createBackToOrderButton(orderId);

  var body = document.getElementById('body');

  body.append(backToOrderButton, table);

  return body;
};

export default rowForXLSX;
