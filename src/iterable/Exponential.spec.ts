import { Exponential } from './Exponential';

it('should create delay which grows exponentially', () => {
	const delay = 1000;
	expect([...new Exponential(delay, 4)]).toEqual([delay, delay * 2, delay * 4, delay * 8]);
	expect([...new Exponential(delay)]).toEqual([delay]);
});
