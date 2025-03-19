var getItemUrl = async (itemUrl) => {
  var btn = document.createElement("button");
  btn.textContent = "Ссылка";

  var a = document.createElement("a");
  a.href = itemUrl;
  a.target = "_blank";

  a.append(btn);

  var td = document.createElement("td");
  td.append(a);

  return td;
};

export default getItemUrl;
