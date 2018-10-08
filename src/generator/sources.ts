export interface SourcedData<T> {
  [source: string]: T[];
}

export class Sources {
  private constructor() { }

  static readonly ALL: string[] = ['EE', 'PHB', 'TOA', 'SCG', 'COS', 'XGE', 'VGM'];

  static get(s: string | string[]): string[] {
    if (s === 'ALL' || s.includes('ALL')) {
      return this.ALL;
    } else {
      return Array.isArray(s) ? [...s] : [s];
    }
  }

  static data<T>(dataSource: SourcedData<T>, sources: string | string[]): T[][] {
    return this.get(sources).map(source => dataSource[source]).filter(d => d);
  }

  static flatData<T>(dataSource: SourcedData<T>, sources: string | string[]): T[] {
    return [].concat.apply([], this.data(dataSource, sources));
  }
}
