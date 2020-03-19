import { MarkovChain } from 'markov-typescript';

import { Random } from './random';
import { NameDefinitions } from './names';

export enum PlaceholderMode {
  Item = 'item',
  Markov = 'markov',
  ItemOrMarkov = 'itemOrMarkov'
}

export interface Placeholder {
  mode: PlaceholderMode;
  markovOrder?: number;
  markovSeparator?: string;
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
    const definitions = NameDefinitions[race];
    if (!definitions) { return undefined; }

    const definition = Random.element(definitions);
    return this.fromDefinition(definition);
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
    switch (placeholder.mode) {
      case PlaceholderMode.Item: return this.resolveItemPlaceholder(placeholder);
      case PlaceholderMode.Markov: return this.resolveMarkovPlaceholder(placeholder);
      default: return this.resolveitemOrMarkovPlaceholder(placeholder);
    }
  }

  static resolveitemOrMarkovPlaceholder(placeholder: Placeholder): string {
    return Random.bool() ? this.resolveItemPlaceholder(placeholder) : this.resolveMarkovPlaceholder(placeholder);
  }

  static resolveItemPlaceholder(placeholder: Placeholder): string {
    return Random.element(placeholder.source);
  }

  static resolveMarkovPlaceholder(placeholder: Placeholder): string {
    const chain: MarkovChain<string> = new MarkovChain<string>(placeholder.markovOrder || 2);
    const separator = placeholder.markovSeparator || '';
    placeholder.source.forEach(n => chain.learn(n.split(separator)));
    return chain.walk().join(separator);
  }
}
