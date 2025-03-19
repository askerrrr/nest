import checkFileExists from "./checkFileExists.js";

var createDownloadFileLink = async (userId, orderId) => {
  var btn = document.createElement("button");
  btn.append("Скачать файл");

  btn.addEventListener("click", async (e) => {
    e.preventDefault();

    var requestAddress = "/download/check/" + userId + "/" + orderId;

    var fileIsExists = await checkFileExists(requestAddress);

    if (!fileIsExists) {
      alert("Не удалось найти файл");
      return;
    }

    window.location.href = "/download/" + userId + "/" + orderId;
  });

  var td = document.createElement("td");
  td.append(btn);

  return td;
};

export default createDownloadFileLink;
