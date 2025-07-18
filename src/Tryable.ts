import { Re } from './Re';

/** Decorate a class method with retry logic. */
export const Tryable = <This, Args extends unknown[], Return>(re: Re) => {
	return (
		fn: (this: This, ...args: Args) => Promise<Return>,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		_: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Promise<Return>>
	) => {
		return function tryable(this: This, ...args: Args): Promise<Return> {
			return re.exec(() => fn.apply(this, args));
		};
	};
};
