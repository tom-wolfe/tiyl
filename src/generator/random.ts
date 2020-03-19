import * as RandomJs from 'random-js';

import { SourcedData, Sources } from './sources';

export interface WeightedOption {
  chance: number;
}

export class Random {
  private static readonly random = new RandomJs.Random(RandomJs.MersenneTwister19937.autoSeed());

  static numberBetween(min: number, max: number) {
    return Random.random.integer(min, max);
  }

  static element<T>(d: T[]): T {
    return Random.random.pick(d);
  }

  static sourcedElement<T>(dataSource: SourcedData<T>, sources: string | string[]): T {
    return Random.random.pick(Sources.flatData(dataSource, sources));
  }

  static dice(roll: string): number {
    const i = roll.toLowerCase().split('d').map(Number);
    return Random.random.dice(i[1], i[0]).reduce((p, c) => p + c, 0);
  }

  static percent(): number {
    return Random.random.integer(1, 100);
  }

  static bool(percent: number = 50): boolean {
    return Random.random.bool(percent);
  }

  static weightedOption<T extends WeightedOption>(options: T[]): T {
    const sum = options.map(o => o.chance).reduce((p, c) => p + c, 0);
    const result = Random.random.integer(1, sum);
    let counter = 0, index = 0, option;
    while (counter < result) {
      option = options[index++];
      counter += option.chance;
    }
    return option;
  }
}
