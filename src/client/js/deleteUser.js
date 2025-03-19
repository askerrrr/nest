var deleteUser = async (userId) => {
  try {
    var url = "/orderinfo/api/delete/" + userId;

    var response = await fetch(url, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });

    return response.status;
  } catch (err) {
    alert("error: ", err);
  }
};

export default deleteUser;
