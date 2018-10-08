import * as AlignmentData from './data/alignments.json';
import { Random } from './random';

export interface Alignment {
  abbreviation: string;
  name: string;
}

export class Alignments {
  private static readonly data = <{ [abbreviation: string]: Alignment }>AlignmentData;

  private constructor() { }

  static all(sources: string | string[] = 'ALL'): Alignment[] {
    return Object.keys(Alignments.data).map(k => Alignments.data[k]);
  }

  static random(): Alignment {
    const r = Random.dice('3d6');
    let a = Alignments.data.LG;
    switch (true) {
      case r < 4: a = (Random.bool()) ? Alignments.data.CE : Alignments.data.CN; break;
      case r < 6: a = Alignments.data.LE; break;
      case r < 9: a = Alignments.data.NE; break;
      case r < 13: a = Alignments.data.TN; break;
      case r < 16: a = Alignments.data.NG; break;
      case r < 18: a = (Random.bool()) ? Alignments.data.LG : Alignments.data.LN; break;
      case r < 19: a = (Random.bool()) ? Alignments.data.CG : Alignments.data.CN; break;
    }
    return a;
  }

  static byAbbreviation(abbreviation): Alignment {
    return Alignments[abbreviation];
  }
}
