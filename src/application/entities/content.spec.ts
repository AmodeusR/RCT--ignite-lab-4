import { Content } from './content';

describe('Notification content', () => {
  test('should create a notification content', () => {
    const content = new Content('Você recebeu uma solicitação de amizade');

    expect(content).toBeTruthy();
  });

  test('should throw error if content lengh is less than 6 chars', () => {
    expect(() => new Content('Olá')).toThrow('Content length invalid');
  });

  test('should throw error if content lengh is higher than 140 chars', () => {
    expect(() => new Content('a'.repeat(141))).toThrow(
      'Content length invalid',
    );
  });
});
