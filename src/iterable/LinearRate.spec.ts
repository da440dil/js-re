import { LinearRate } from './LinearRate';

it('should create delay which grows linearly with specified rate', () => {
	const delay = 1000;
	const rate = 2000;
	expect([...new LinearRate(delay, rate, 4)]).toEqual([delay, delay * 3, delay * 5, delay * 7]);
	expect([...new LinearRate(delay, rate)]).toEqual([delay]);
});
