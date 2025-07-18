import { Re } from './Re';

describe('exec', () => {
	const re = new Re([10, 20, 30]);
	const fn = jest.fn();
	const v = 42;
	const e = new Error('Some error');

	let arr: { error: unknown; delay: number; }[] = [];
	re.on('retry', (v) => { arr.push(v); });

	afterEach(() => {
		jest.clearAllMocks();
		arr = [];
	});

	it('should return if function returns', async () => {
		fn.mockResolvedValue(v);
		await expect(re.exec(fn)).resolves.toBe(v);
		expect(fn.mock.calls.length).toBe(1);
		expect(arr).toEqual([]);
	});

	it('should retry if function throws error', async () => {
		fn.mockRejectedValue(e);
		await expect(re.exec(fn)).rejects.toThrow(e);
		expect(fn.mock.calls.length).toBe(4);
		expect(arr).toEqual([{ error: e, delay: 10 }, { error: e, delay: 20 }, { error: e, delay: 30 }]);
	});

	it('should return if function throws error and finally returns', async () => {
		fn.mockRejectedValueOnce(e).mockRejectedValueOnce(e).mockResolvedValue(v);
		await expect(re.exec(fn)).resolves.toBe(v);
		expect(fn.mock.calls.length).toBe(3);
		expect(arr).toEqual([{ error: e, delay: 10 }, { error: e, delay: 20 }]);
	});
});

describe('exec', () => {
	class ReType extends Re {
		public override isTryable(err: unknown): boolean {
			return err instanceof TypeError;
		}
	}

	const re = new ReType([10, 20, 30]);
	const fn = jest.fn();

	const arr: { error: unknown; delay: number; }[] = [];
	re.on('retry', (v) => { arr.push(v); });

	it('should not retry if function throws error which is not tryable', async () => {
		const err = new Error('Some error');
		fn.mockRejectedValue(err);
		await expect(re.exec(fn)).rejects.toThrow(err);
		expect(fn.mock.calls.length).toBe(1);
		expect(arr).toEqual([]);
	});
});

describe('Re', () => {
	it('should throw if iterable is empty', () => {
		expect(() => new Re([])).toThrow();
	});
});
