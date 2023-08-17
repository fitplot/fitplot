import { expect, test } from 'vitest';

import fitcode from './fitcode';

test('3x10@100', () => {
  expect(fitcode('3x10@100')).toEqual([
    { volume: 10, amount: 100 },
    { volume: 10, amount: 100 },
    { volume: 10, amount: 100 },
  ]);
});

test('10@100', () => {
  expect(fitcode('10@100')).toEqual([{ volume: 10, amount: 100 }]);
});

test('100', () => {
  expect(fitcode('100')).toEqual([{ volume: 1, amount: 100 }]);
});

test('3x10@100/200/300', () => {
  expect(fitcode('3x10@100/200/300')).toEqual([
    { volume: 10, amount: 100 },
    { volume: 10, amount: 200 },
    { volume: 10, amount: 300 },
  ]);
});

test('3x7/8/9@100', () => {
  expect(fitcode('3x7/8/9@100')).toEqual([
    { volume: 7, amount: 100 },
    { volume: 8, amount: 100 },
    { volume: 9, amount: 100 },
  ]);
});

test('3x7/8/9@100/200/300', () => {
  expect(fitcode('3x7/8/9@100/200/300')).toEqual([
    { volume: 7, amount: 100 },
    { volume: 8, amount: 200 },
    { volume: 9, amount: 300 },
  ]);
});

test('10@100,20@50', () => {
  expect(fitcode('10@100,20@50')).toEqual([
    { volume: 10, amount: 100 },
    { volume: 20, amount: 50 },
  ]);
});
