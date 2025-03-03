var checkFileExists = async (userId, orderId) => {
  var url = '/xlsx/check/' + userId + '/' + orderId;

  var response = await fetch(url);

  var json = await response.json();

  return json.fileIsExists;
};

export default checkFileExists;
