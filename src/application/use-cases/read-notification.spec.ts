import { ReadNotification } from './read-notification';
import { NotificationNotFound } from './errors/notification-not-found';
import { SendNotification } from './send-notification';
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repositories';

describe('Read notification', () => {
  test('should mark notification as read', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);
    const readNotification = new ReadNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      recipientId: 'abellum',
      content: 'Opa! Essa notificação foi enviada sem querer.',
      category: 'miscelaneous',
    });

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notification.readAt).toEqual(expect.any(Date));
  });

  test('should not be able to read a non-existent notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    expect(() => {
      return readNotification.execute({
        notificationId: 'it-should-throw-error',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
