export default function renderXLSX(userId, orderId) {
  var btn = document.createElement("button");
  btn.append("Открыть файл");

  var form = document.createElement("form");
  form.action = `/xlsx/${userId}/${orderId}`;
  form.append(btn);

  var td = document.createElement("td");
  td.append(form);

  return td;
}
