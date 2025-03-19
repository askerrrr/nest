var getDescription = async (description) => {
  var qty = document.createElement("div");
  var size = document.createElement("div");

  qty.append("Количество : " + description.qty);
  size.append("Размер : " + description.size);

  var hr = document.createElement("hr");
  var td = document.createElement("td");
  td.append(qty, hr, size);

  return td;
};

export default getDescription;
