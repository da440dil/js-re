import { ExponentialRate } from './ExponentialRate';

it('should create delay which grows exponentially with specified rate', () => {
	const delay = 1000;
	const rate = 0.2;
	const arr = [1000, 1200, 1440, 1728];
	const iterable = new ExponentialRate(delay, rate, arr.length);
	for (let i = 0; i < 3; i++) {
		const vs = [...arr];
		for (const v of iterable) {
			expect(v).toBe(vs.shift());
		}
		expect(vs.length).toBe(0);
	}
});
