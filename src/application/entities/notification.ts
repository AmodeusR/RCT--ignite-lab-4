import { randomUUID } from 'node:crypto';
import { Replace } from 'src/helpers/Replacer';
import { Content } from './content';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
  canceledAt?: Date | null;
}

export class Notification {
  private _id: string;
  private props: NotificationProps;

  constructor(
    props: Replace<NotificationProps, { createdAt?: Date | null }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  // ID
  get id() {
    return this._id;
  }

  // Recipient ID
  set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  get recipientId(): string {
    return this.props.recipientId;
  }

  // Content
  set content(content: Content) {
    this.props.content = content;
  }

  get content(): Content {
    return this.props.content;
  }

  // Category
  set category(category: string) {
    this.props.category = category;
  }

  get category(): string {
    return this.props.category;
  }

  // Read At
  read() {
    this.props.readAt = new Date();
  }

  unread() {
    this.props.readAt = null;
  }

  get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  // Created At
  get createdAt(): Date {
    return this.props.createdAt;
  }

  // CanceledAt
  get canceledAt(): Date | null | undefined {
    return this.props.canceledAt;
  }

  cancel() {
    this.props.canceledAt = new Date();
  }
}
