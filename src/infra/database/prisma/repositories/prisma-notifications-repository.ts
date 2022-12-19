import { PrismaNotificationMapper } from './../mappers/prisma-notification-mappers';
import { PrismaService } from './../prisma.service';
import { Notification } from 'src/application/entities/notification';
import { NotificationsRepository } from 'src/application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    await this.prisma.notification.create({
      data: PrismaNotificationMapper.toPrisma(notification),
    });
  }

  async save(notification: Notification): Promise<void> {
    const prismaNotification = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.update({
      where: {
        id: notification.id,
      },
      data: prismaNotification,
    });
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const notificationsCount = await this.prisma.notification.count({
      where: { recipientId },
    });

    return notificationsCount;
  }

  async getManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: { recipientId },
    });

    const domainNotifications = notifications.map((notification) =>
      PrismaNotificationMapper.toDomain(notification),
    );

    return domainNotifications;
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) return null;

    return PrismaNotificationMapper.toDomain(notification);
  }
}
