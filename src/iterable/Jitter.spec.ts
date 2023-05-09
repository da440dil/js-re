import { Jitter } from './Jitter';

it('should randomly add to or extract from delay', () => {
	const delay = 1000;
	const jitter = 100;
	const iterable = new Jitter([delay, delay, delay], jitter);
	const min = delay - jitter;
	const max = delay + jitter;
	for (let i = 0; i < 20; i++) {
		for (const v of iterable) {
			expect(v).toBeGreaterThanOrEqual(min);
			expect(v).toBeLessThanOrEqual(max);
		}
	}
});
