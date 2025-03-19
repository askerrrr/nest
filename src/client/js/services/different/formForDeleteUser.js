import deleteUser from "../../deleteUser.js";
import showAlertByHttpStatus from "./showAlertByHttpStatus.js";

var createDeleteUserForm = async (userId) => {
  var button = document.createElement("button");
  button.type = "submit";
  button.append("Удалить пользователя");

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    var confirmDeletion = confirm("Удалить пользователя?");

    if (!confirmDeletion) {
      return;
    }

    var responseStatus = await deleteUser(userId);

    if (responseStatus == 200) {
      var table = document.getElementById("active");
      var tbody = document.getElementById(userId);
      table.removeChild(tbody);

      window.location.replace("/");
      return;
    } else {
      await showAlertByHttpStatus(responseStatus);
      return;
    }
  });

  var form = document.createElement("form");

  form.action = "/orderinfo/api/delete/" + userId;
  form.className = "form-for-delete";
  form.append(button);

  return form;
};

export default createDeleteUserForm;
