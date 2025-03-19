var getLastUnmarkedCheckboxID = async (name) => {
  var checkbox = document.querySelectorAll(name);

  var arr = [];

  for (var i of checkbox.keys()) {
    arr.push(checkbox[i]);
  }

  var unmarkedCheckboxes = arr.filter((e) => e.checked === false);

  if (unmarkedCheckboxes.length == 1) {
    var lastUnmarkedCheckboxID = unmarkedCheckboxes[0].id;

    return lastUnmarkedCheckboxID;
  }
};

export default getLastUnmarkedCheckboxID;
