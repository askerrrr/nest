var changeOrderStatus = async (userId, orderId, status) => {
  var url = "/status/" + userId + "/" + orderId + "/" + status;

  var response = await fetch(url, {
    method: "PATCH",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    var err = await response.text();
    alert("error: ", err);
    return;
  }

  return response;
};

export default changeOrderStatus;
