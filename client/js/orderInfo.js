import rowForSingle from "./services/row/rowForSingle.js";
import rowForMultiple from "./services/row/rowForMultiple.js";

async function getOrderInfo() {
  try {
    var pathParts = window.location.pathname.split("/");
    var userId = pathParts.at(-1);

    var response = await fetch(`/orderinfo/api/order/${userId}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      var err = await response.text();
      console.log(err);
      return;
    }

    var orders = await response.json();

    return orders.order?.type
      ? await rowForSingle(orders)
      : await rowForMultiple(orders);
  } catch (err) {
    console.log(err);
  }
}

getOrderInfo();
