import checkFileExists from "./checkFileExists.js";

var createLinkForOpenImage = async (userId, orderId) => {
  var btn = document.createElement("button");
  btn.append("Открыть");

  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("click");
    var requestAddress = "/image/check/" + userId + "/" + orderId;

    var fileIsExists = await checkFileExists(requestAddress);

    if (!fileIsExists) {
      alert("Не удалось найти фото");
      return;
    }

    window.location.href = "/image/" + userId + "/" + orderId;
  });

  var td = document.createElement("td");
  td.append(btn);

  return td;
};

export default createLinkForOpenImage;
