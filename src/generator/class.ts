import * as ClassData from './data/classes.json';
import { Random } from './random';
import { SourcedData, Sources } from './sources';

export interface Class {
  name: string;
  reasons: string[];
  other: { [name: string]: string[] };
}

export class Classes {
  private static readonly data = <SourcedData<Class>>ClassData;

  private constructor() { }

  static names(sources: string | string[] = 'ALL'): string[] {
    return Sources.flatData(Classes.data, sources).map(c => c.name).sort();
  }

  static byName(name: string): Class {
    return [].concat.apply([], Object.keys(Classes).map(r => Classes[r])).filter(r => r.name === name)[0];
  }

  static random(sources: string | string[] = 'ALL'): Class {
    return Random.sourcedElement(Classes.data, sources);
  }

  static reason(cClass: Class): string {
    return Random.element(cClass.reasons);
  }

  static other(cClass: Class): { name: string, value: string }[] {
    if (!cClass.other) { return []; }
    return Object.keys(cClass.other).map(o => ({ name: o, value: Random.element(cClass.other[o]) }));
  }
}
