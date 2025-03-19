var createTableHeadForOrder = (order) => {
  var phone = document.createElement("th");
  phone.append("Телефон");

  var photo = document.createElement("th");
  photo.append("Изображение");

  var orderFile = document.createElement("th");
  orderFile.append("Файл");

  var orderId = document.createElement("th");
  orderId.append("ID заказа");

  var orderDate = document.createElement("th");
  orderDate.append("Заказ от");

  var description = document.createElement("th");
  description.append("Описание");

  var status = document.createElement("th");
  status.append("Текущий статус");

  var itemUrl = document.createElement("th");
  itemUrl.append("Ссылка на товар");

  var xlsx = document.createElement("th");
  xlsx.append("Файл");

  var thead = document.getElementById("thead");

  var tr = document.createElement("tr");

  if (order?.type == "single") {
    tr.append(
      orderId,
      orderDate,
      phone,
      photo,
      itemUrl,
      description,
      status,
      orderFile
    );

    thead.append(tr);

    return thead;
  }

  tr.append(orderId, orderDate, xlsx, phone, status, orderFile);

  thead.append(tr);

  return thead;
};

export default createTableHeadForOrder;
