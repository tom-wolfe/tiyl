import { Random } from '@tiyl/generator/random';

describe('random', () => {
  describe('numberBetween', () => {
    it('should always be between min and max', () => {
      for (let x = 0; x < 100; x++) {
        const res = Random.numberBetween(1, 10);
        expect(res).toBeLessThan(11);
        expect(res).toBeGreaterThan(0);
      }
    });
    it('is inclusive', () => {
      expect(Random.numberBetween(1, 1)).toBe(1);
    });
  });
  describe('element', () => {
    it('should pick an element of the array', () => {
      const input = ['test'];
      for (let x = 0; x < 100; x++) {
        expect(Random.element(input)).toBe(input[0]);
      }
    });
  });
  describe('dice', () => {
    it('should roll the right number of times', () => {
      expect(Random.dice('10d1')).toBe(10);
    });
  });
  describe('percent', () => {
    it('should always be between 1 and 100', () => {
      for (let x = 0; x < 10000; x++) {
        const res = Random.percent();
        expect(res).toBeLessThan(101);
        expect(res).toBeGreaterThan(0);
      }
    });
  });
});
