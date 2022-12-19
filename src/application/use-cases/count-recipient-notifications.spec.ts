import { CountRecipientNotifications } from './count-recipient-notifications';
import { SendNotification } from './send-notification';
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repositories';

describe('Count recipient notifications', () => {
  test('should return count of recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    const recipientIds = [
      'recipient-id-to-be-counted',
      'recipient-id-to-be-counted',
      'recipient-id-to-be-ignored',
    ];

    recipientIds.forEach(async (recipientId, i) => {
      await sendNotification.execute({
        recipientId,
        content: `Notificação número ${i + 1}`,
        category: 'social',
      });
    });

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-id-to-be-counted',
    });

    expect(count).toEqual(2);
  });
});
