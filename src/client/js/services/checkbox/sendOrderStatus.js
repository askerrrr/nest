var sendOrderStatus = async (userId, orderId, orderStatus) => {
  var response = await fetch('/status', {
    method: 'PATCH',
    body: JSON.stringify({ userId, orderId, orderStatus }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return (response.status = 200);
};

export default sendOrderStatus;
