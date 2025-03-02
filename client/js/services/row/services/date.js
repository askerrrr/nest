var renderDate = async (orderDate) => {
  var td = document.createElement('td');
  td.append(orderDate);

  return td;
};

export default renderDate;
