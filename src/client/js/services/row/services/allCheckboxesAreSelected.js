var allCheckboxesAreSelected = async (name) => {
  var checkbox = document.querySelectorAll(name);

  var arr = [];

  for (var i = 0; i < checkbox.length; i++) {
    arr.push(checkbox[i]);
  }

  return arr.every((e) => e.checked === true);
};

export default allCheckboxesAreSelected;
