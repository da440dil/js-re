export const RetryLater = 'Retry later';

export class RetryableError extends Error { }
RetryableError.prototype.name = 'RetryableError';
RetryableError.prototype.message = RetryLater;
