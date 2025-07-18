import { Re, Exponential } from '../src';
import { main } from './example';

main(new Re(new Exponential(20, 3))).catch(console.error);
