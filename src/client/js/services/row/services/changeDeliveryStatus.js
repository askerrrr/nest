import createCheckbox from "./createCheckbox.js";
import sendDeliveryStatus from "./sendDeliveryStatus.js";
import getCurrentOrderStatus from "./getCurrentOrderStatus.js";

var changeDeliveryStatus = async (userId, orderId, items) => {
  var [value, purchasedstatus, deliveryStatus] = items.split(":::");

  var checkbox = await createCheckbox(orderId, "delivery-status");

  if (Boolean(+deliveryStatus)) {
    checkbox.checked = true;
  } else {
    checkbox.checked = false;
  }

  var orderStatus = await getCurrentOrderStatus(
    userId,
    orderId,
    "/deliverystatus/"
  );

  if (orderStatus !== "purchased:2") {
    checkbox.disabled = true;
  }

  checkbox.addEventListener("change", async (e) => {
    e.preventDefault();

    if (checkbox.checked) {
      await sendDeliveryStatus(
        userId,
        orderId,
        value + ":::" + purchasedstatus + ":::" + 1
      );
    } else {
      await sendDeliveryStatus(
        userId,
        orderId,
        value + ":::" + purchasedstatus + ":::" + 0
      );
    }
  });

  var td = document.createElement("td");
  td.append(checkbox);

  return td;
};

export default changeDeliveryStatus;
