import { Re, Jitter } from '../src';
import { main } from './example';

main(new Re(new Jitter([50, 50, 50], 20))).catch(console.error);
