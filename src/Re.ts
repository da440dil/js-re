import { promisify } from 'util';

const sleep = promisify(setTimeout);

export class Re {
	/** Decorate a class method with retry logic. */
	public static Tryable<This, Args extends unknown[], Return>(re: Re) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		return (fn: (this: This, ...args: Args) => Promise<Return>, _: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Promise<Return>>) => {
			return function tryable(this: This, ...args: Args): Promise<Return> {
				return re.exec(() => fn.apply(this, args));
			};
		};
	}

	private iterable: Iterable<number>;

	constructor(iterable: Iterable<number>, { isTryable }: {
		/** Error checking function. Answers the question: should the error be taken into account or not. By default, all errors are taken into account. */
		isTryable?: (err: unknown) => boolean;
	} = {}) {
		this.iterable = iterable;
		if (isTryable) {
			this.isTryable = isTryable;
		}
	}

	/** Execute a function with retry logic. */
	public async exec<T>(fn: () => Promise<T>): Promise<T> {
		for (const delay of this.iterable) {
			try {
				const v = await fn();
				return v;
			} catch (err) {
				if (this.isTryable(err)) {
					await sleep(delay);
					continue;
				}
				throw err;
			}
		}
		return fn();
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	private isTryable(_: unknown): boolean {
		return true;
	}
}
