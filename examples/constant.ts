import { Re, Constant } from '../src';
import { main } from './example';

main(new Re(new Constant(50, 3))).catch(console.error);
