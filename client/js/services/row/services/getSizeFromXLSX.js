export default async (size) => {
  var td = document.createElement("td");

  if (size.length == 0) {
    td.append("Пусто");

    return td;
  }
  td.append(size);

  return td;
};
