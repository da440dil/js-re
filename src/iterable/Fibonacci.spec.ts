import { Fibonacci } from './Fibonacci';

it('should create delay which grows using Fibonacci algorithm', () => {
	const delay = 1000;
	const arr = [delay, delay * 2, delay * 3, delay * 5, delay * 8];
	const iterable = new Fibonacci(delay, arr.length);
	for (let i = 0; i < 3; i++) {
		const vs = [...arr];
		for (const v of iterable) {
			expect(v).toBe(vs.shift());
		}
		expect(vs.length).toBe(0);
	}
});
