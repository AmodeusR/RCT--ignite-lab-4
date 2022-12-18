import { PrismaService } from './../prisma.service';
import { Notification } from 'src/application/entities/notification';
import { NotificationsRepository } from 'src/application/repositories/notification-repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaSerive: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    await this.prismaSerive.notification.create({
      data: {
        id: notification.id,
        recipientId: notification.recipientId,
        content: notification.content.value,
        category: notification.category,
        createdAt: notification.createdAt,
        readAt: notification.readAt,
      },
    });
  }
}
