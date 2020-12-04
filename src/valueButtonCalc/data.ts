import { grey, yellow } from '../theme/theme';
import {
  minus,
  plus,
  equals,
  multyplication,
  divider,
  float,
  allClean,
  inversion,
  memoryClear,
  memoryRead,
  memoryIncrement,
  memoryDecrement,
  percent,
} from '../redux/actions/actions';

const first = [
  { color: grey, icon: 'AC', press: allClean },
  { icon: 'MC', press: memoryClear },
  { icon: '7' },
  { icon: '4' },
  { icon: '1' },
  { icon: '0', class: 'zero' },
];

const second = [
  { color: grey, icon: '-/+', press: inversion },
  { icon: 'MR', press: memoryRead },
  { icon: '8' },
  { icon: '5' },
  { icon: '2' },
];

const third = [
  { color: grey, icon: '%', press: percent },
  { icon: 'M-', press: memoryDecrement },
  { icon: '9' },
  { icon: '6' },
  { icon: '3' },
  { value: '.', icon: ',', press: float },
];

const fourth = [
  { color: yellow, icon: '/', press: divider },
  { color: yellow, icon: 'M+', press: memoryIncrement },
  { value: '*', color: yellow, icon: 'X', press: multyplication },
  { color: yellow, icon: '-', press: minus },
  { color: yellow, icon: '+', press: plus },
  { color: yellow, icon: '=', press: equals },
];

export { first, second, third, fourth };
