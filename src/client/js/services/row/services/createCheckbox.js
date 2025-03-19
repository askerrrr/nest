var count = 0;

var createCheckbox = async (orderId, name) => {
  var checkbox = document.createElement("input");
  checkbox.id = +orderId + count++;
  checkbox.type = "checkbox";
  checkbox.name = name;

  return checkbox;
};

export default createCheckbox;
