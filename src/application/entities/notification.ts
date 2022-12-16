import { Replace } from './../../helpers/Replacer';
import { Content } from './content';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private props: NotificationProps;

  constructor(props: Replace<NotificationProps, { createdAt?: Date | null }>) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
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
  set readAt(readAt: Date | null | undefined) {
    this.props.readAt = readAt;
  }

  get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  // Created At
  get createdAt(): Date {
    return this.props.createdAt;
  }
}