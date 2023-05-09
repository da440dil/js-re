/** Exponential iterable creates delay which grows exponentially. */
export class Exponential implements Iterable<number> {
	private d: number;
	private i: number;

	constructor(delay: number, maxRetries = 1) {
		this.d = delay;
		this.i = maxRetries;
	}

	public *[Symbol.iterator]() {
		let i = this.i;
		let d = this.d;
		while (i--) {
			const v = d;
			d += d;
			yield v;
		}
	}
}
