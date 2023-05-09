import { Re } from './Re';
import { RetryableError } from './RetryableError';

describe('exec', () => {
	const iterable = [50, 50, 50];
	const re = new Re(iterable);
	const fn = jest.fn();
	const v = 42;
	const e = new Error('Some error');

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should return if function returns', async () => {
		fn.mockResolvedValue(v);
		await expect(re.exec(fn)).resolves.toBe(v);
		expect(fn.mock.calls.length).toBe(1);
	});

	it('should retry if function throws error', async () => {
		fn.mockRejectedValue(e);
		await expect(re.exec(fn)).rejects.toThrowError(e);
		expect(fn.mock.calls.length).toBe(iterable.length + 1);
	});

	it('should return if function throws error and finally returns', async () => {
		fn.mockRejectedValueOnce(e).mockRejectedValueOnce(e).mockResolvedValue(v);
		await expect(re.exec(fn)).resolves.toBe(v);
		expect(fn.mock.calls.length).toBe(3);
	});
});

describe('exec', () => {
	const iterable = [50, 50, 50];
	const isTryable = (err: unknown): boolean => {
		return err instanceof RetryableError;
	};
	const re = new Re(iterable, { isTryable });
	const fn = jest.fn();

	it('should not retry if function throws error which is not tryable', async () => {
		const err = new Error('Some error');
		fn.mockRejectedValue(err);
		await expect(re.exec(fn)).rejects.toThrowError(err);
		expect(fn.mock.calls.length).toBe(1);
	});
});

describe('Tryable', () => {
	const iterable = [50, 50, 50];
	const re = new Re(iterable);
	const e = new Error('Some error');

	class T {
		private i = 0;

		@Re.Tryable(re)
		public test(x: number, y: number): Promise<number> {
			this.i++;
			return this.i === 3 ? Promise.resolve((this.i + x) * y) : Promise.reject(e);
		}
	}

	it('should decorate a class method with retry logic', async () => {
		const t = new T();
		await expect(t.test(2, 3)).resolves.toBe(15);
	});
});
