import { Re, ExponentialRate } from '../src';
import { main } from './example';

main(new Re(new ExponentialRate(20, 0.5, 3))).catch(console.error);
