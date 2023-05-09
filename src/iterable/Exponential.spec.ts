import { Exponential } from './Exponential';

it('should create delay which grows exponentially', () => {
	const delay = 1000;
	const arr = [delay, delay * 2, delay * 4, delay * 8];
	const iterable = new Exponential(delay, arr.length);
	for (let i = 0; i < 3; i++) {
		const vs = [...arr];
		for (const v of iterable) {
			expect(v).toBe(vs.shift());
		}
		expect(vs.length).toBe(0);
	}
});
