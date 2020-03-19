import { Random } from './random';

export enum PlaceholderMode {
  Item = 'item',
  Markov = 'markov',
  ItemOrMarkov = 'itemOrMarkov'
}

export interface Placeholder {
  mode: PlaceholderMode;
  markovOrder?: number;
  maxLength?: number;
  source: string[];
}

export interface NameDefinition {
  patterns: string[];
  placeholders: { [key: string]: Placeholder };
}

export class Names {
  private constructor() { }

  static byRace(race: string): string {
    const raceNames: NameDefinition = undefined; // TODO: Lookup by race.
    return this.fromDefinition(raceNames);
  }

  static fromDefinition(definition: NameDefinition): string {
    let name = Random.element(definition.patterns);

    name = name.replace(/{(.+?)}/g, (_, phName) => {
      const placeholder = definition.placeholders[phName];
      if (!placeholder) { throw new RangeError(`Name part ${phName} has no definition.`); }
      return this.resolvePlaceholder(placeholder);
    });

    return name;
  }

  static resolvePlaceholder(placeholder: Placeholder): string {
    return 'face'; // TODO: Resolve placeholder.
  }
}
