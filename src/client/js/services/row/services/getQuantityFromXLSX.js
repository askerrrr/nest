var getQuantityFromXLSX = async (qty) => {
  var td = document.createElement("td");

  if (qty.length === 0) {
    td.append("Пусто");

    return td;
  }

  td.append(qty);

  return td;
};

export default getQuantityFromXLSX;
