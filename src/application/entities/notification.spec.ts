import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  test('should be able to create a notification', () => {
    const notification = new Notification({
      recipientId: 'amodeusr',
      content: new Content('Esta é uma nova notificação'),
      category: 'science',
      createdAt: new Date(),
      readAt: null,
    });

    expect(notification).toBeTruthy();
  });
});
