export default function tableHeadToXLSX() {
  var img = document.createElement("th");
  img.append("Фото");
  var url = document.createElement("th");
  url.append("Ссылка");
  var qty = document.createElement("th");
  qty.append("Количество");
  var size = document.createElement("th");
  size.append("Размер");
  var itemStatus = document.createElement("th");
  itemStatus.append("Статус выкупа");
  var priceOfEach = document.createElement("th");
  priceOfEach.append("Цена");
  var totalSum = document.createElement("th");
  totalSum.append("Всего");
  var itemId = document.createElement("th");
  itemId.append("ID предмета");
  var editItemId = document.createElement("th");
  editItemId.append("Редактировать ID предмета");

  var thead = document.createElement("thead");

  thead.append(
    img,
    url,
    qty,
    size,
    priceOfEach,
    totalSum,
    itemStatus,
    itemId,
    editItemId
  );

  return thead;
}
