var checkFileExists = async (url) => {
  var response = await fetch(url);

  var json = await response.json();

  return json.fileIsExists;
};

export default checkFileExists;
