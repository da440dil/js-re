import { Constant } from './Constant';

it('should create delay which is always the same', () => {
	const delay = 1000;
	const arr = [delay, delay, delay, delay];
	const iterable = new Constant(delay, arr.length);
	for (let i = 0; i < 3; i++) {
		const vs = [...arr];
		for (const v of iterable) {
			expect(v).toBe(vs.shift());
		}
		expect(vs.length).toBe(0);
	}
});
