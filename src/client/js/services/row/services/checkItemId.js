var checkItemId = (itemId) => {
  var nums = itemId.split("").filter((e) => +e);
  var str = itemId
    .split("")
    .map((e) => e.toLowerCase())
    .filter((e) => e.charCodeAt() > 96 && e.charCodeAt() < 123);

  return nums.length + str.length == itemId.length && itemId.length < 30;
};

export default checkItemId;
