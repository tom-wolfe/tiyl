import { SourcedData, Sources } from '@tiyl/generator/sources';

describe('sources', () => {
  describe('get', () => {
    it('should expand to all on string all', () => {
      expect(Sources.get('ALL')).toBe(Sources.ALL);
    });
    it('should expand to all on array all', () => {
      expect(Sources.get(['ALL'])).toBe(Sources.ALL);
    });
  });
  describe('data', () => {
    it('should get correct data', () => {
      const data: SourcedData<string> = {
        'PHB': ['face'],
        'TOA': ['test'],
      };
      expect(Sources.data(data, ['PHB'])).toEqual([['face']]);
      expect(Sources.data(data, ['TOA', 'PHB'])).toEqual([['test'], ['face']]);
      expect(Sources.data(data, 'ALL')).toEqual([['face'], ['test']]);
    });
  });
  describe('flatData', () => {
    it('should get correct data', () => {
      const data = {
        'PHB': ['face', 'face2'],
        'TOA': ['test', 'test2'],
      };
      expect(Sources.flatData(data, ['PHB'])).toEqual(['face', 'face2']);
      expect(Sources.flatData(data, ['TOA', 'PHB'])).toEqual(['test', 'test2', 'face', 'face2']);
      expect(Sources.flatData(data, 'ALL')).toEqual(['face', 'face2', 'test', 'test2']);
    });
  });
});
