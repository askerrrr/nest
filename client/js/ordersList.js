import rowForListOfActiveOrders from "./services/row/rowForListOfActiveOrders.js";

async function getOrderList() {
  try {
    var pathParts = window.location.pathname.split("/");
    var userId = pathParts.at(-1);

    var response = await fetch(`/orderinfo/api/${userId}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      var err = await response.text();
      console.log(err);
      return;
    }

    var orders = await response.json();

    return await rowForListOfActiveOrders(orders);
  } catch (err) {
    console.log(err);
  }
}

getOrderList();
