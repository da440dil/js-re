import { Re, LinearRate } from '../src';
import { main } from './example';

main(new Re(new LinearRate(20, 30, 3))).catch(console.error);
