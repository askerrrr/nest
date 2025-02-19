export default async function deleteUser(userId) {
  try {
    var response = await fetch(`/orderinfo/api/delete/${userId}`, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      var err = await response.text();
      console.log(err);
      return;
    }

    return response;
  } catch (err) {
    console.log(err);
  }
}
