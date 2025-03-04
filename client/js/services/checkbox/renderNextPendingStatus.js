var renderNextPendingStatus = (array, statusId) =>
  array
    .filter((e) => e.statusId !== +statusId + 1)
    .map((elem) => (document.getElementById(elem.statusId).disabled = true));

export default renderNextPendingStatus;
