import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repositories';
import { SendNotification } from './send-notification';

describe('Send notification', () => {
  test('should be able to send notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    const notification = await sendNotification.execute({
      recipientId: 'example-recipient-id',
      content: 'Você recebeu uma nova notificação!',
      category: 'general',
    });

    expect(notification).toBeTruthy();
  });

  test('should have notifications array length of 1', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      recipientId: 'example-recipient-id',
      content: 'Você recebeu uma nova notificação!',
      category: 'general',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
