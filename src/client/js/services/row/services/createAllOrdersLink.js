var createAllOrdersLink = async (userId) => {
  var btn = document.createElement("button");
  btn.append(userId);

  var form = document.createElement("form");

  form.method = "GET";
  form.append(btn);
  form.action = "/orderinfo/orders/" + userId;

  var td = document.createElement("td");
  td.append(form);

  return td;
};

export default createAllOrdersLink;
