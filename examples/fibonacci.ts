import { Re, Fibonacci } from '../src';
import { main } from './example';

main(new Re(new Fibonacci(20, 4))).catch(console.error);
