import checkFileExists from './checkFileExists.js';

var createXlsxFileLink = async (userId, orderId) => {
  var btn = document.createElement('button');
  btn.append('Открыть файл');

  btn.addEventListener('click', async (e) => {
    e.preventDefault();

    var fileIsExists = await checkFileExists(userId, orderId);

    if (!fileIsExists) {
      alert('Не удалось найти файл');
      return;
    }

    window.location.href = '/xlsx/' + userId + '/' + orderId;
  });

  var td = document.createElement('td');
  td.append(btn);

  return td;
};

export default createXlsxFileLink;
