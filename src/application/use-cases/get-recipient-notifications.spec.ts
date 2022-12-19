import { GetRecipientNotifications } from './get-recipient-notifications';
import { SendNotification } from './send-notification';
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repositories';

describe('Get recipient notifications', () => {
  test('should get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-id-to-be-counted',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-id-to-be-counted' }),
        expect.objectContaining({ recipientId: 'recipient-id-to-be-counted' }),
      ]),
    );
  });
});
