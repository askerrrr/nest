export default async function deleteOrder(userId, orderId) {
  try {
    var response = await fetch(`/orderinfo/api/delete/${userId}/${orderId}`, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      var err = await response.text();
      console.log(err);
      return;
    }

    window.location.href = `/orderinfo/orders/${userId}`;
  } catch (err) {
    console.log(err);
  }
}
