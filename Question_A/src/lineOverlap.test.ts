import { doLinesOverlap } from './lineOverlap';

test('lines (1,5) and (2,6) should overlap', () => {
  expect(doLinesOverlap([1, 5], [2, 6])).toBeTruthy();
});

test('lines (1,5) and (6,8) should not overlap', () => {
  expect(doLinesOverlap([1, 5], [6, 8])).toBeFalsy();
});

test('invalid line segment (5,1) should throw an error', () => {
  expect(() => doLinesOverlap([5, 1], [2, 6])).toThrow('Line segments must be in the format [lower, upper]');
});

test('invalid line segment (8,6) should throw an error', () => {
  expect(() => doLinesOverlap([1, 5], [8, 6])).toThrow('Line segments must be in the format [lower, upper]');
});
