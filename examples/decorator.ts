import http from 'node:http';
import { once } from 'node:events';
import { Re, Tryable } from '../src';

// Create retry strategy which retries execution in case of an error after 10ms, 20ms, 30ms.
const re = new Re([10, 20, 30]);

re.on('retry', ({ error, delay }) => {
	console.log(`${error}, retry after ${delay}ms`);
});

class Client {
	// Decorate class method with retry logic.
	@Tryable(re)
	public async get(): Promise<string> {
		const res = await fetch('http://localhost:3000');
		if (res.status !== 200) {
			throw new Error(`Failed with status ${res.status}`);
		}
		return res.text();
	}
}

async function main() {
	let x = 0;
	const server = http.createServer((_, res) => {
		// { 0 => 200, 1 => 418, 2 => 200, ... => 418 }
		res.writeHead(x > 2 || x % 2 ? 418 : 200).end(`{ x: ${x++} }`);
	});
	server.listen(3000);
	await once(server, 'listening');

	const client = new Client();
	for (let i = 0; i < 3; i++) {
		try {
			const data = await client.get();
			console.log(`DATA: ${data}`);
		} catch (err) {
			console.log(`ERROR: ${err}`);
		}
	}
	// Output:
	// DATA: { x: 0 }
	// Error: Failed with status 418, retry after 10ms
	// DATA: { x: 2 }
	// Error: Failed with status 418, retry after 10ms
	// Error: Failed with status 418, retry after 20ms
	// Error: Failed with status 418, retry after 30ms
	// ERROR: Error: Failed with status 418

	server.close();
	await once(server, 'close');
}

main().catch(console.error);
