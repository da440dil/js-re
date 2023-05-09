/** Jitter sets maximum duration randomly added to or extracted from delay between retries to improve performance under high contention. */
export class Jitter implements Iterable<number> {
	private iterable: Iterable<number>;
	private n: number;
	private j: number;

	constructor(iterable: Iterable<number>, jitter: number) {
		this.iterable = iterable;
		this.n = jitter * 2 + 1;
		this.j = jitter;
	}

	public *[Symbol.iterator]() {
		for (const delay of this.iterable) {
			yield delay + Math.floor(Math.random() * this.n) - this.j;
		}
	}
}
