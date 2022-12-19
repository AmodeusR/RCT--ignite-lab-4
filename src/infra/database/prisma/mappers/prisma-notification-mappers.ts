import { Notification as PrismaNotification } from '@prisma/client';
import { Content } from 'src/application/entities/content';
import { Notification } from 'src/application/entities/notification';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
      createdAt: notification.createdAt,
      readAt: notification.readAt,
    };
  }

  static toDomain(notification: PrismaNotification): Notification {
    return new Notification(
      {
        category: notification.category,
        content: new Content(notification.content),
        recipientId: notification.recipientId,
        canceledAt: notification.canceledAt,
        readAt: notification.readAt,
        createdAt: notification.createdAt,
      },
      notification.id,
    );
  }
}
