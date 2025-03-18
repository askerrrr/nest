var changeOrderStatus = async (userId, orderId, status) => {
  try {
    var url = '/status/' + userId + '/' + orderId + '/' + status;

    var response = await fetch(url, {
      method: 'PATCH',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      var err = await response.text();
      console.log(err);
      return;
    }

    return response;
  } catch (err) {
    console.log(err);
  }
};

export default changeOrderStatus;
