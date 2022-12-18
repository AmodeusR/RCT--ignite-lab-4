import { NotificationNotFound } from "./errors/notification-not-found";
import { SendNotification } from './send-notification';
import { CancelNotification } from './cancel-notification';
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repositories';

describe('Cancel notification', () => {
  test('should be able to cancel notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);
    const cancelNotification = new CancelNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      recipientId: 'abellum',
      content: 'Opa! Essa notificação foi enviada sem querer.',
      category: 'miscelaneous',
    });

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  test('should not be able to cancel a non-existent notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'it-should-throw-error',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
