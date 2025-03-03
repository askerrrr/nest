var openImage = async (userId, orderId) => {
  var btn = document.createElement('button');
  btn.append('Открыть');

  var form = document.createElement('form');

  form.id = orderId;
  form.target = '_blank';
  form.append(btn);
  form.action = '/image/' + userId + '/' + orderId;

  var td = document.createElement('td');
  td.append(form);

  return td;
};

export default openImage;
