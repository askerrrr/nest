var showAlertByHttpStatus = async (status) => {
  switch (status) {
    case 304:
      alert("Не удалось удалить заказ на стороне бота");
      break;
    case 404:
      alert(
        "Не удалось удалить заказ по причине:\n заказа с таким id нет на стороне бота"
      );
      break;
    default:
      alert("Не удалось удалить заказ.\nНеизвестный статус: " + status);
      break;
  }
};

export default showAlertByHttpStatus;
