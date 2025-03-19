var getItemId = async (itemId) => {
  var td = document.createElement("td");
  td.id = itemId || "";
  td.append(itemId || "");
  return td;
};

export default getItemId;
