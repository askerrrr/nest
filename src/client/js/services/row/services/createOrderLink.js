var createOrderLink = async (userId, orderId) => {
  var btn = document.createElement("button");
  btn.append(orderId);

  var form = document.createElement("form");

  form.append(btn);
  form.action = "/orderinfo/orders/order/" + userId + "/" + orderId;

  var td = document.createElement("td");
  td.append(form);

  return td;
};

export default createOrderLink;
