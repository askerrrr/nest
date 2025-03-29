import renderNextUnmarkedPendingStatus from './renderNextPendingStatus.js';
import getCurrentOrderStatus from '../row/services/getCurrentOrderStatus.js';
import renderUnmarkedCheckBoxForFirstStatus from './renderCheckBoxForFirstStatus.js';

var saveAndRenderCurrentOrderStatus = async (userId, orderId) => {
  try {
    var orderStatus = await getCurrentOrderStatus(
      userId,
      orderId,
      '/status/api/',
    );

    var statusId = orderStatus.split(':')[1];
    console.log(orderStatus.split(':'));
    var checkBoxCollection = document.querySelectorAll(
      `input[name=order-status]`,
    );

    var arrayOfCheckBoxesID = [];

    for (let i = 0; i < checkBoxCollection.length; i++) {
      arrayOfCheckBoxesID.push({ statusId: +checkBoxCollection[i].id });
    }

    return orderStatus == 'not-accepted-for-processing:0'
      ? renderUnmarkedCheckBoxForFirstStatus(arrayOfCheckBoxesID)
      : renderNextUnmarkedPendingStatus(arrayOfCheckBoxesID, statusId);
  } catch (err) {
    console.log(err);
  }
};

export default saveAndRenderCurrentOrderStatus;
