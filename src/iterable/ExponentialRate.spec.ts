import { ExponentialRate } from './ExponentialRate';

it('should create delay which grows exponentially with specified rate', () => {
	const delay = 1000;
	const rate = 0.2;
	expect([...new ExponentialRate(delay, rate, 4)]).toEqual([1000, 1200, 1440, 1728]);
	expect([...new ExponentialRate(delay, rate)]).toEqual([delay]);
});
