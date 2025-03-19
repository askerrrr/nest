var getUserInfo = async (userId) => {
  var userInfo = document.createElement("div");
  userInfo.id = "user-info";

  var btn = document.createElement("button");
  btn.append(`ID пользователя: ${userId}`);

  var formForUserId = document.createElement("form");
  formForUserId.action = "/orderinfo/orders/" + userId;
  formForUserId.append(btn);

  userInfo.append(formForUserId);

  return userInfo;
};

export default getUserInfo;
