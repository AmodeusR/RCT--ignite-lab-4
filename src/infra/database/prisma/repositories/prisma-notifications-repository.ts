import { PrismaNotificationMapper } from './../mappers/prisma-notification-mappers';
import { PrismaService } from './../prisma.service';
import { Notification } from 'src/application/entities/notification';
import { NotificationsRepository } from 'src/application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaSerive: PrismaService) {}

  findById(notificationId: string): Promise<Notification | null> {
    throw new Error('Method not implemented.');
  }

  async create(notification: Notification): Promise<void> {
    await this.prismaSerive.notification.create({
      data: PrismaNotificationMapper.toPrisma(notification),
    });
  }

  save(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
