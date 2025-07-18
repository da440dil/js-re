import { Re } from './Re';
import { Tryable } from './Tryable';

describe('Tryable', () => {
	const iterable = [10, 20, 30];
	const re = new Re(iterable);
	const e = new Error('Some error');

	class T {
		private i = 0;

		@Tryable(re)
		public test(x: number, y: number): Promise<number> {
			this.i++;
			return this.i === 3 ? Promise.resolve((this.i + x) * y) : Promise.reject(e);
		}
	}

	it('should decorate a class method with retry logic', async () => {
		const t = new T();
		await expect(t.test(2, 3)).resolves.toBe(15);
	});
});
