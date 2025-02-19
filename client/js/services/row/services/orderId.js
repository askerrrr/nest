export default function renderOrderId(orderId) {
  var td = document.createElement("td");
  td.append(orderId);

  return td;
}
