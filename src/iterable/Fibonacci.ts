/** Fibonacci iterable creates delay which grows using Fibonacci algorithm. */
export class Fibonacci implements Iterable<number> {
	private d: number;
	private i: number;

	constructor(delay: number, maxRetries = 1) {
		this.d = delay;
		this.i = maxRetries;
	}

	public *[Symbol.iterator]() {
		let i = this.i;
		let prev = 0;
		let curr = this.d;
		while (i--) {
			[prev, curr] = [curr, prev + curr];
			yield curr;
		}
	}
}
