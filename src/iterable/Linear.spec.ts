import { Linear } from './Linear';

it('should create delay which grows linearly', () => {
	const delay = 1000;
	const arr = [delay, delay * 2, delay * 3, delay * 4];
	const iterable = new Linear(delay, arr.length);
	for (let i = 0; i < 3; i++) {
		const vs = [...arr];
		for (const v of iterable) {
			expect(v).toBe(vs.shift());
		}
		expect(vs.length).toBe(0);
	}
});
