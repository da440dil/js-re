import { Linear } from './Linear';

it('should create delay which grows linearly', () => {
	const delay = 1000;
	expect([...new Linear(delay, 4)]).toEqual([delay, delay * 2, delay * 3, delay * 4]);
	expect([...new Linear(delay)]).toEqual([delay]);
});
