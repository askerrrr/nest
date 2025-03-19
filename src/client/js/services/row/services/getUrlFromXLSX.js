var getUrlFromXLSX = async (url) => {
  var btn = document.createElement("button");
  btn.textContent = "ссылка";

  var td = document.createElement("td");
  if (!url?.length) {
    td.append("Пусто");
    return td;
  }

  var a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.append(btn);

  var td = document.createElement("td");
  if (!url?.length) {
    td.append("Пусто");
    return td;
  }

  td.append(a);

  return td;
};

export default getUrlFromXLSX;
