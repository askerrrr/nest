var sendItemIdToServer = async (userId, orderId, index, itemId) => {
  var response = await fetch("/itemid", {
    method: "PATCH",
    body: JSON.stringify({ userId, orderId, index, itemId }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    var err = await response.text();
    alert("Ошибка при обновлении статуса: " + err);
    console.log("ErrorOfSetItemID: ", err);
    return;
  }
};

export default sendItemIdToServer;
