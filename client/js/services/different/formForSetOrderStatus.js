export default async function formForSetOrderStatus(userId, orderId) {
  return document
    .getElementById("submit-order-status")
    .addEventListener("click", async (e) => {
      e.preventDefault();

      var btn = document.getElementById(`button-${orderId}`);
      var fieldset = document.getElementById(`fieldset-${orderId}`);

      var checkBox = document.querySelector("input[name=order-status]:checked");

      if (!checkBox) {
        alert("Вы ничего не выбрали");
        return;
      }

      var idOfMarkedCheckBox = checkBox.id;
      var orderStatus = checkBox.value + ":" + idOfMarkedCheckBox;

      document.getElementById("submit-order-status").disabled = true;

      var response = await fetch(
        `/status/${userId}/${orderId}/${orderStatus}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        var err = await response.text();
        alert(
          `Ошибка при обновлении статуса. Попробуйте еще раз\n\nОшибка: ${err}`
        );

        fieldset?.remove();
        window.dialog.close();
        document.getElementById("submit-order-status").disabled = false;
        btn.disabled = false;

        return;
      }

      alert("Статус успешно обновлен");
      fieldset?.remove();
      window.dialog.close();
      document.getElementById("submit-order-status").disabled = false;
      btn.disabled = false;
      window.location.reload();
    });
}
