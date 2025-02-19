import deleteUser from "../../../deleteUser.js";

export default async function buttonForDeleteUser(userId) {
  var btn = document.createElement("button");
  btn.type = "submit";
  btn.append("Удалить");

  btn.addEventListener("click", async (e) => {
    e.preventDefault();

    var tbody = document.getElementById(userId);

    var table = document.getElementById("homepage");
    table.removeChild(tbody);

    alert("Пользователь был удален");

    window.location.href = `/orderinfo/users`;

    return deleteUser(userId);
  });

  var form = document.createElement("form");
  form.action = `/orderinfo/delete/${userId}`;
  form.append(btn);

  var td = document.createElement("td");
  td.append(form);

  return td;
}
