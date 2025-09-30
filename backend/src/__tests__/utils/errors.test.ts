import { AppError } from '@/utils/errors';

describe('AppError', () => {
  it('should create an AppError with default status code', () => {
    const error = new AppError('Test error');

    expect(error.message).toBe('Test error');
    expect(error.statusCode).toBe(500);
    expect(error.code).toBeUndefined();
    expect(error.name).toBe('AppError');
  });

  it('should create an AppError with custom status code', () => {
    const error = new AppError('Not found', 404);

    expect(error.message).toBe('Not found');
    expect(error.statusCode).toBe(404);
    expect(error.code).toBeUndefined();
  });

  it('should create an AppError with custom status code and code', () => {
    const error = new AppError(
      'Character not found',
      404,
      'CHARACTER_NOT_FOUND'
    );

    expect(error.message).toBe('Character not found');
    expect(error.statusCode).toBe(404);
    expect(error.code).toBe('CHARACTER_NOT_FOUND');
  });

  it('should be an instance of Error', () => {
    const error = new AppError('Test error');

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(AppError);
  });
});
