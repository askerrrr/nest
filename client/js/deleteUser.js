var deleteUser = async (userId) => {
  try {
    var url = '/orderinfo/api/delete/' + userId;

    var response = await fetch(url, {
      method: 'DELETE',
      headers: { Accept: 'application/json' },
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
};

export default deleteUser;
