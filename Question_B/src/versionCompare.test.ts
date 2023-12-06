import { compareVersions } from './versionCompare';

describe('Version Comparison Tests', () => {
  test('1.2 is greater than 1.1', () => {
    expect(compareVersions('1.2', '1.1')).toBe(1);
  });

  test('1.1 is less than 1.2', () => {
    expect(compareVersions('1.1', '1.2')).toBe(-1);
  });

  test('1.1 is equal to 1.1', () => {
    expect(compareVersions('1.1', '1.1')).toBe(0);
  });

  test('1.10 is greater than 1.2', () => {
    expect(compareVersions('1.10', '1.2')).toBe(1);
  });

  test('2.0 is greater than 1.9999', () => {
    expect(compareVersions('2.0', '1.9999')).toBe(1);
  });

  test('1.0.0 is equal to 1', () => {
    expect(compareVersions('1.0.0', '1')).toBe(0);
  });

  test('1.0.1 is greater than 1.0', () => {
    expect(compareVersions('1.0.1', '1.0')).toBe(1);
  });

  test('Version with letters should be handled', () => {
    expect(() => compareVersions('1.a', '1')).toThrow();
    expect(() => compareVersions('1', '1.b')).toThrow();
  });
});
