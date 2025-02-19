import saveAndRenderCurrentOrderStatus from "./saveOrderStatus.js";
import createCheckBoxForOrderStatus from "./checkBoxForOrderStatus.js";

export default async function formForOpenPopUp(userId, orderId) {
  orderId = +orderId;
  var button = document.createElement("button");

  button.id = `button-${orderId}`;
  button.className = "change-order-status";
  button.textContent = "Изменить статут заказа";

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    button.disabled = true;
    await createCheckBoxForOrderStatus(orderId);

    await saveAndRenderCurrentOrderStatus(userId, orderId);

    window.dialog.showModal();
  });

  var form = document.createElement("form");
  form.append(button);

  return form;
}
