/** LinearRate iterable creates delay which grows linearly with specified rate. */
export class LinearRate implements Iterable<number> {
	private d: number;
	private r: number;
	private i: number;

	constructor(delay: number, rate: number, maxRetries = 1) {
		this.d = delay;
		this.r = rate;
		this.i = maxRetries;
	}

	public *[Symbol.iterator]() {
		let i = this.i;
		let d = this.d;
		while (i--) {
			const v = d;
			d += this.r;
			yield v;
		}
	}
}
