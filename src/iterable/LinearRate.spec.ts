import { LinearRate } from './LinearRate';

it('should create delay which grows linearly with specified rate', () => {
	const delay = 1000;
	const rate = 2000;
	const arr = [delay, delay * 3, delay * 5, delay * 7];
	const iterable = new LinearRate(delay, rate, arr.length);
	for (let i = 0; i < 3; i++) {
		const vs = [...arr];
		for (const v of iterable) {
			expect(v).toBe(vs.shift());
		}
		expect(vs.length).toBe(0);
	}
});
