import * as TrinketData from './data/trinkets.json';
import { Random } from './random';

export class Items {
  private static readonly data = <string[]><any>TrinketData;

  private constructor() { }

  static trinket(): string {
    return Random.element(Items.data);
  }
}
