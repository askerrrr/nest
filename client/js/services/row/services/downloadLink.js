var createDownloadLink = async (userId, orderId) => {
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.append('Скачать файл');

  var form = document.createElement('form');

  form.id = orderId;
  form.append(btn);
  form.action = '/download/' + userId + '/' + orderId;

  var td = document.createElement('td');
  td.append(form);

  return td;
};

export default createDownloadLink;
