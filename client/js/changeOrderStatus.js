export default async function changeOrderStatus(userId, orderId, status) {
  try {
    var response = await fetch(`/status/${userId}/${orderId}/${status}`, {
      method: "POST",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      var err = await response.text();
      console.log(err);
      return;
    }

    return response;
  } catch (err) {
    console.log(err);
  }
}
