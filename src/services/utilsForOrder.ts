export class UtilsForOrder {
  async deleteUserDataFromBot(userId, orderId) {
    var response = await fetch('env.bot_server_ip', {
      method: 'DELETE',
      body: JSON.stringify({ userId, orderId }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${'env.bearer_token'}`,
      },
    });

    if (!response.ok) throw new Error(response.statusText);
  }
}
9