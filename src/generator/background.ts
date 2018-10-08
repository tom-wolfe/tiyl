import { Alignment } from '@tiyl/generator/alignment';

import * as BackgroundData from './data/backgrounds.json';
import { Random } from './random';
import { SourcedData, Sources } from './sources';

export interface Background {
  name: string;
  reasons?: string[];
  traits: string[];
  ideals: Ideal[];
  bonds: string[];
  flaws: string[];
  other?: { [name: string]: string[] };
}

export interface Ideal {
  ideal: string;
  alignments: string[];
}

export class Backgrounds {
  private static readonly data = <SourcedData<Background>>BackgroundData;

  private constructor() { }

  static names(sources: string | string[] = 'ALL'): string[] {
    return Sources.flatData(Backgrounds.data, sources).map(b => b.name).sort();
  }

  static byName(name: string): Background {
    return [].concat.apply([], Object.keys(Backgrounds).map(r => Backgrounds[r])).filter(r => r.name === name)[0];
  }

  static reason(background: Background): string {
    if (background.reasons && background.reasons.length > 0) {
      return Random.element(background.reasons);
    }
    return '...';
  }

  static traits(background: Background): [string, string] {
    const trait1 = Random.element(background.traits || []);
    const filteredTraits = background.traits.filter(i => i !== trait1);
    const trait2 = Random.element(filteredTraits || []);
    return [trait1, trait2];
  }

  static ideal(background: Background, alignment: Alignment): Ideal {
    const ideals = background.ideals.filter(i => i.alignments.length === 0 || i.alignments.includes(alignment.abbreviation));
    return Random.element(ideals);
  }

  static bond(background: Background): string {
    return Random.element(background.bonds || []);
  }

  static flaw(background: Background): string {
    return Random.element(background.flaws || []);
  }

  static other(background: Background): { name: string, value: string }[] {
    if (!background.other) { return []; }
    return Object.keys(background.other).map(o => ({ name: o, value: Random.element(background.other[o]) }));
  }

  static random(sources: string | string[] = 'ALL'): Background {
    return Random.sourcedElement(Backgrounds.data, sources);
  }
}
