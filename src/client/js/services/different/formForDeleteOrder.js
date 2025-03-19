import deleteOrder from "../../deleteOrder.js";
import showAlertByHttpStatus from "./showAlertByHttpStatus.js";

var createDeleteOrderForm = async (userId, orderId) => {
  var button = document.createElement("button");
  button.type = "submit";
  button.append("Удалить заказ");

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    var confirmDeletion = confirm("Удалить заказ?");

    if (!confirmDeletion) {
      return;
    }

    var responseStatus = await deleteOrder(userId, orderId);

    if (responseStatus == 200) {
      alert("Заказ был удален!");

      var tbody = document.getElementById(orderId);
      var table = document.getElementById("table");
      table.removeChild(tbody);

      window.location.replace("/orderinfo/orders/" + userId);
      return;
    } else {
      await showAlertByHttpStatus(responseStatus);
      return;
    }
  });

  var form = document.createElement("form");
  form.action = "/orderinfo/delete/" + userId + "/" + orderId;
  form.className = "form-for-delete";
  form.append(button);

  return form;
};

export default createDeleteOrderForm;
