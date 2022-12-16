export class Content {
  private content: string;

  constructor(content: string) {
    const isContentLengthValid = this.validateContentLength(content);

    if (!isContentLengthValid) {
      throw new Error('Content length invalid');
    }
    this.content = content;
  }

  get value(): string {
    return this.content;
  }

  private validateContentLength(content: string) {
    return content.length >= 5 && content.length <= 140;
  }
}
