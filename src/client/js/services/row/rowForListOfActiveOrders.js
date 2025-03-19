import getOrderDate from "./services/getOrderDate.js";
import createOrderLink from "./services/createOrderLink.js";
import createDeleteUserForm from "../different/formForDeleteUser.js";
import getOrderStatusDescription from "./services/getOrderStatusDescription.js";

var rowForListOfActiveOrders = async (data) => {
  var { userId, orders } = data;

  document.title = "Пользователь " + userId;

  var tbody = document.createElement("tbody");
  tbody.id = userId;
  var table = document.getElementById("active");

  var activeOrders = orders.filter(
    (e) => e.order.orderStatus !== "order-is-completed:6"
  );

  activeOrders.forEach(async (e) => {
    var { id, date, orderStatus } = e.order;

    var tr = document.createElement("tr");

    tr.append(
      await getOrderDate(date),
      await createOrderLink(userId, id),
      await getOrderStatusDescription(orderStatus)
    );

    tbody.append(tr);
    table.append(tbody);
    return table;
  });

  var completedOrders = orders.filter(
    (e) => e.order.orderStatus == "order-is-completed:6"
  );

  if (completedOrders.length > 0) {
    await showCompletedOrders(completedOrders);
  }

  var formForDeleteUser = await createDeleteUserForm(userId);

  var body = document.getElementById("body");
  body.append(formForDeleteUser);
};

var showCompletedOrders = async (completedOrders) => {
  var btn = document.createElement("button");
  btn.append("Показать завершенные");
  btn.id = "show-completed";
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    btn.disabled = true;
    await deleteCompeledOrders();

    var tbody = document.createElement("tbody");
    tbody.id = "tbody-completed";

    var table = document.getElementById("completed");

    completedOrders.forEach(async (e) => {
      var { id, date, userId, orderStatus } = e.order;

      var tr = document.createElement("tr");

      tr.append(
        await getOrderDate(date),
        await createOrderLink(userId, id),
        await getCurrentOrderStatus(orderStatus)
      );

      tbody.append(tr);
      table.append(tbody);
      return table;
    });
  });

  var form = document.createElement("form");
  form.append(btn);

  var body = document.getElementById("body");
  body.append(form);
};

var deleteCompeledOrders = async () => {
  var btn = document.createElement("button");
  btn.append("Скрыть");

  var form = document.createElement("form");
  form.append(btn);

  var body = document.getElementById("body");
  body.append(form);

  return btn.addEventListener("click", async (e) => {
    e.preventDefault();

    var table = document.getElementById("completed");
    var tbody = document.getElementById("tbody-completed");

    document.getElementById("show-completed").disabled = false;
    table.removeChild(tbody);
    form.remove();
  });
};

export default rowForListOfActiveOrders;
