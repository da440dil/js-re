/** Constant iterable creates delay which is always the same. */
export class Constant implements Iterable<number> {
	private d: number;
	private i: number;

	constructor(delay: number, maxRetries = 1) {
		this.d = delay;
		this.i = maxRetries;
	}

	public *[Symbol.iterator]() {
		let i = this.i;
		while (i--) {
			yield this.d;
		}
	}
}
