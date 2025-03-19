import createCheckbox from "./createCheckbox.js";
import sendPurchasedStatus from "./sendPurchasedStatus.js";
import getCurrentOrderStatus from "./getCurrentOrderStatus.js";

var changePurchasedStatus = async (userId, orderId, items) => {
  var [value, purchasedStatus, deliveryStatus] = items.split(":::");

  var checkbox = await createCheckbox(orderId, "purchased-status");

  if (Boolean(+purchasedStatus)) {
    checkbox.checked = true;
  } else {
    checkbox.checked = false;
  }

  var orderStatus = await getCurrentOrderStatus(
    userId,
    orderId,
    "/purchasedstatus/"
  );

  if (orderStatus !== "in-processing:1") {
    checkbox.disabled = true;
  }

  checkbox.addEventListener("change", async (e) => {
    e.preventDefault();

    var newItem;

    if (checkbox.checked) {
      newItem = value + ":::" + 1 + ":::" + deliveryStatus;
      await sendPurchasedStatus(userId, orderId, newItem);
    } else {
      newItem = value + ":::" + 0 + ":::" + deliveryStatus;
      await sendPurchasedStatus(userId, orderId, newItem);
    }
  });

  var td = document.createElement("td");
  td.append(checkbox);

  return td;
};

export default changePurchasedStatus;
