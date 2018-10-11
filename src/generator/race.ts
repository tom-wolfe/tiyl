import * as RaceData from './data/races.json';
import { Random } from './random';
import { SourcedData, Sources } from './sources';

export interface Race {
  name: string;
  subraces: Subrace[];
  parents?: ParentChoice[];
  other?: {
    [name: string]: string[];
  };
}

export interface Subrace {
  name: string;
  parents?: ParentChoice[];
  other?: {
    [name: string]: string[];
  };
}

export interface ParentChoice {
  chance: number;
  parent1: string;
  parent2: string;
}

export class Races {
  private static readonly data = <SourcedData<Race>>RaceData;

  private constructor() { }

  static names(sources: string | string[] = 'ALL'): string[] {
    return Sources.flatData(Races.data, sources).map(r => r.name).sort();
  }

  static subraceNames(race: string): string[] {
    const r = Races.byName(race);
    if (!r) { return []; }
    return r.subraces.map(sr => sr.name).sort();
  }

  static byName(name: string): Race {
    return Sources.flatData(Races.data, 'ALL').filter(r => r.name === name)[0];
  }

  static random(sources: string | string[] = 'ALL'): Race {
    return Random.sourcedElement(Races.data, sources);
  }

  static randomSubrace(race: Race): Subrace {
    return Random.element(race.subraces);
  }

  static other(race: Race, subrace: Subrace): { name: string, value: string }[] {
    const r: { name: string, value: string }[] = [];
    if (race.other) {
      r.push(...Object.keys(race.other).map(o => ({ name: o, value: Random.element(race.other[o]) })));
    }
    if (subrace && subrace.other) {
      r.push(...Object.keys(subrace.other).map(o => ({ name: o, value: Random.element(subrace.other[o]) })));
    }
    return r;
  }
}
