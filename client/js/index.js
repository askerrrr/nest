import rowForUserList from "./services/row/rowForUserList.js";

async function GetUsers() {
  try {
    var response = await fetch("/api/users", {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      var err = await response.text();
      console.log(err);
      return;
    }

    var users = await response.json();

    users.forEach((user) => rowForUserList(user));
  } catch (err) {
    console.log(err);
  }
}

GetUsers();
