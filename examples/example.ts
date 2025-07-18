import http from 'node:http';
import { once } from 'node:events';
import { Re } from '../src';

class Client {
	private re: Re;

	constructor(re: Re) {
		this.re = re;
	}

	public get(): Promise<string> {
		// Execute function with retry logic.
		return this.re.exec(async () => {
			const res = await fetch('http://localhost:3000');
			if (res.status !== 200) {
				throw new Error(`Failed with status ${res.status}`);
			}
			return res.text();
		});
	}
}

export async function main(re: Re) {
	let x = 0;
	const server = http.createServer((_, res) => {
		// { 0 => 200, 1 => 418, 2 => 200, ... => 418 }
		res.writeHead(x > 2 || x % 2 ? 418 : 200).end(`{ x: ${x++} }`);
	});
	server.listen(3000);
	await once(server, 'listening');

	re.on('retry', ({ error, delay }) => {
		console.log(`${error}, retry after ${delay}ms`);
	});

	const client = new Client(re);
	for (let i = 0; i < 3; i++) {
		try {
			const data = await client.get();
			console.log(`DATA: ${data}`);
		} catch (err) {
			console.log(`ERROR: ${err}`);
		}
	}

	server.close();
	await once(server, 'close');
};
