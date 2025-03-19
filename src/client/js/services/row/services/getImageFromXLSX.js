var getImageFromXLSX = async (base64) => {
  var td = document.createElement("td");

  if (!base64) {
    td.append("Пусто");

    return td;
  }

  var img = document.createElement("img");
  img.width = 200;
  img.height = 200;
  img.alt = "image";
  img.src = `data:image/png=;base64,${base64}`;

  td.append(img);

  return td;
};

export default getImageFromXLSX;
