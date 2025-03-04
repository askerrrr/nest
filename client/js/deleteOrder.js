var deleteOrder = async (userId, orderId) => {
  try {
    var url = '/orderinfo/api/delete/' + userId + '/' + orderId;

    var response = await fetch(url, {
      method: 'DELETE',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      var err = await response.text();
      console.log(err);
      return;
    }

    window.location.href = '/orderinfo/orders/' + userId;
  } catch (err) {
    console.log(err);
  }
};

export default deleteOrder;
