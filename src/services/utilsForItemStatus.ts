export class UtilsForItemStatus {
  async allItemsArePurchased(items) {
    var itemStatus = items?.map((item) => item.split(':::')[1]);

    return itemStatus?.every((status) => status == '2');
  }

  async sendOrderStatusUpdate(userId, orderId, orderStatus) {
    var response = await fetch('env.bot_server_ip', {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${'env.bearer_token'}`,
      },
      body: JSON.stringify({
        userId,
        orderId,
        orderStatus,
      }),
    });

    if (!response.ok) {
      var err = await response.text();
      console.log('Ошибка при отправлении статуса боту: ', err);
      return;
    }
  }
}
