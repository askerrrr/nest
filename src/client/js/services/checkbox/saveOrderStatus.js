import renderNextUnmarkedPendingStatus from "./renderNextPendingStatus.js";
import renderUnmarkedCheckBoxForFirstStatus from "./renderCheckBoxForFirstStatus.js";

var saveAndRenderCurrentOrderStatus = async (userId, orderId) => {
  try {
    var url = "/status/api/" + userId + "/" + orderId;
    var response = await fetch(url);

    if (!response.ok) {
      var err = await response.text();
      console.log("response err", err);
    }

    var json = await response.json();
    var orderStatus = json.orderStatus;

    let statusId = orderStatus.split(":")[1];

    var checkBoxCollection = document.querySelectorAll(
      `input[name=order-status]`
    );

    var arrayOfCheckBoxesID = [];

    for (let i = 0; i < checkBoxCollection.length; i++) {
      arrayOfCheckBoxesID.push({ statusId: +checkBoxCollection[i].id });
    }

    return orderStatus == "not-accepted-for-processing:0"
      ? renderUnmarkedCheckBoxForFirstStatus(arrayOfCheckBoxesID)
      : renderNextUnmarkedPendingStatus(arrayOfCheckBoxesID, statusId);
  } catch (err) {
    console.log(err);
  }
};

export default saveAndRenderCurrentOrderStatus;
