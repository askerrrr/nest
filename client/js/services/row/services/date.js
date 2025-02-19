export default function renderDate(orderDate) {
  var td = document.createElement("td");
  td.append(orderDate);

  return td;
}
