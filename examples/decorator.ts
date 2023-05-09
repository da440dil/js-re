import http from 'http';
import { Re } from '../src';

// Create retry strategy which retries execution in case of an error after 10ms, 20ms, 30ms.
const re = new Re([10, 20, 30]);

class Client {
	private url = 'http://localhost:3000';
	// Decorate the class method with retry logic.
	@Re.Tryable(re)
	public get(): Promise<string> {
		return new Promise((resolve, reject) => {
			const req = http.get(this.url, (res) => {
				if (res.statusCode !== 200) {
					res.resume();
					return reject(new Error(`Failed with statusCode ${String(res.statusCode)}`));
				}
				let data = '';
				res.on('data', (chunk) => { data += chunk; });
				res.on('end', () => { resolve(data); });
			});
			req.on('error', reject);
		});
	}
}
const client = new Client();
const get = async () => {
	try {
		const data = await client.get();
		console.log(`DATA: ${data}`);
	} catch (err) {
		console.log(err instanceof Error ? `ERROR: ${(err).message}` : err);
	}
};

let x = 0;
const server = http.createServer((_, res) => {
	const statusCode = x > 2 || x % 2 ? 418 : 200; // { 0 => 200, 1 => 418, 2 => 200, ... => 418 }
	res.writeHead(statusCode).end(`{ x: ${x} }`);
	x++;
});
server.listen(3000);

async function main() {
	for (let i = 0; i < 3; i++) {
		await get();
	}
	// Output:
	// 	DATA: { x: 0 }
	// DATA: { x: 2 }
	// ERROR: Failed with statusCode 418
}

main().then(() => { process.exit(0); }).catch((err) => { console.error(err); process.exit(1); });
