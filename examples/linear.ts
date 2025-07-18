import { Re, Linear } from '../src';
import { main } from './example';

main(new Re(new Linear(20, 3))).catch(console.error);
