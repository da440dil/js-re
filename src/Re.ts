import { EventEmitter } from 'node:events';
import { setTimeout } from 'node:timers/promises';

export class Re extends EventEmitter<{ retry: [{ error: unknown; delay: number; }]; }> {
	private iterable: Iterable<number>;

	constructor(iterable: Iterable<number>) {
		super();
		if (iterable[Symbol.iterator]().next().done) {
			throw new Error('Iterable must yield at least one value');
		}
		this.iterable = iterable;
	}

	/** Execute a function with retry logic. */
	public async exec<T>(fn: () => Promise<T>): Promise<T> {
		for (const delay of this.iterable) {
			try {
				const v = await fn();
				return v;
			} catch (err) {
				if (this.isTryable(err)) {
					this.emit('retry', { error: err, delay });
					await setTimeout(delay);
					continue;
				}
				throw err;
			}
		}
		return fn();
	}

	/**
	 * Error checking function. Answers the question: should retry or not. Default: retry after any error.
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected isTryable(_: unknown): boolean {
		return true;
	}
}
