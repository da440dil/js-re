import { Fibonacci } from './Fibonacci';

it('should create delay which grows using Fibonacci algorithm', () => {
	const delay = 1000;
	expect([...new Fibonacci(delay, 5)]).toEqual([delay, delay * 2, delay * 3, delay * 5, delay * 8]);
	expect([...new Fibonacci(delay)]).toEqual([delay]);
});
