var checkFileExists = async ( requestAddress) => {
  var response = await fetch(requestAddress);

  var json = await response.json();

  return json.fileIsExists;
};

export default checkFileExists;
