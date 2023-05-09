/** Linear iterable creates delay which grows linearly. */
export class Linear implements Iterable<number> {
	private d: number;
	private i: number;

	constructor(delay: number, maxRetries = 1) {
		this.d = delay;
		this.i = maxRetries;
	}

	public *[Symbol.iterator]() {
		let i = this.i;
		let d = 0;
		while (i--) {
			d += this.d;
			yield d;
		}
	}
}
