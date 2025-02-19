import createId from "./services/id.js";
import createDate from "./services/date.js";
import renderCurrentOrderStatus from "./services/currentOrdeStatus.js";

export default async function rowForListOfActiveOrders(data) {
  document.title = `Пользователь ${data.userId}`;
  var tbody = document.createElement("tbody");
  var table = document.getElementById("active");

  var activeOrders = data.orders.filter(
    (orders) => orders.order.orderStatus !== "order-is-completed:6"
  );

  activeOrders.forEach((orders) => {
    var orderId = orders.order.id;
    var orderDate = orders.order.date;
    var status = orders.order.orderStatus;

    var tr = document.createElement("tr");

    tr.append(
      createDate(orderDate),
      createId(orderId),
      renderCurrentOrderStatus(status)
    );

    tbody.append(tr);
    table.append(tbody);
    return table;
  });

  var completedOrders = data.orders.filter(
    (orders) => orders.order.orderStatus == "order-is-completed:6"
  );

  if (completedOrders.length > 0) await showCompletedOrders(completedOrders);
}

var showCompletedOrders = async (completedOrders) => {
  var btn = document.createElement("button");
  btn.append("Показать");
  btn.id = "show-completed";
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    btn.disabled = true;
    await deleteCompeledOrders();

    var tbody = document.createElement("tbody");
    tbody.id = "tbody-completed";

    var table = document.getElementById("completed");

    completedOrders.forEach((orders) => {
      var orderId = orders.order.id;
      var orderDate = orders.order.date;
      var status = orders.order.orderStatus;

      var tr = document.createElement("tr");

      tr.append(
        createDate(orderDate),
        createId(orderId),
        renderCurrentOrderStatus(status)
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
  btn.append("Удалить");

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
