var getItemPrice = async (priceOfEach) => {
  var td = document.createElement('td');
  td.append(priceOfEach);

  return td;
};

export default getItemPrice;
