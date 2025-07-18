import { Constant } from './Constant';

it('should create delay which is always the same', () => {
	const delay = 1000;
	expect([... new Constant(delay, 4)]).toEqual([delay, delay, delay, delay]);
	expect([...new Constant(delay)]).toEqual([delay]);
});
