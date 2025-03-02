var renderUnmarkedCheckBoxForFirstStatus = (array) =>
  array
    .slice(1)
    .map((e) => (document.getElementById(e.statusId).disabled = true));

export default renderUnmarkedCheckBoxForFirstStatus;
