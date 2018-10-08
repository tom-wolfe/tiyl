import { Race, Subrace } from '@tiyl/generator/race';

import { Life } from './life';
import { Random } from './random';

export interface Parents {
  mother: Parent;
  father: Parent;
}

export interface Parent {
  race: string;
  absent?: string;
  occupation: string;
}

export interface RaisedBy {
  name: string;
  absent: ('mother' | 'father')[];
}

export interface Lifestyle {
  name: string;
  modifier: number;
}

export interface Sibling {
  relativeAge: string;
  relationship: string;
  occupation: string;
  status: string;
  attitude: string;
}

export class Family {
  private constructor() { }

  static knewParents(): boolean {
    return Random.percent() <= 95;
  }

  static parents(race: Race, subrace: Subrace): Parents {
    // Figure out which parent options to choose from.
    const options: { chance: number, parent1: string, parent2: string }[] = [];
    if (subrace && subrace.parents) {
      options.push(...subrace.parents);
    } else if (race.parents) {
      options.push(...race.parents);
    } else {
      options.push({ chance: 100, parent1: race.name, parent2: race.name });
    }

    // 50/50 chance to switch races.
    const { parent1, parent2 } = Random.weightedOption(options);
    if (Random.bool()) {
      return { mother: { race: parent1, occupation: null }, father: { race: parent2, occupation: null } };
    } else {
      return { mother: { race: parent2, occupation: null }, father: { race: parent1, occupation: null } };
    }
  }

  static absentParent(): string {
    switch (Random.dice('1d4')) {
      case 1: return `is dead. ${Life.causeOfDeath()}.`;
      case 2: return 'was imprisoned, enslaved, or otherwise taken away.';
      case 3: return 'abandoned you.';
      case 4: return 'disappeared to an unknown fate.';
    }
  }

  static siblingSex(): 'brother' | 'sister' {
    // The random.bool() function always returns true, so use percent instead.
    return (Random.percent() <= 50) ? 'brother' : 'sister';
  }

  static siblings(race: Race): number {
    const r = Random.dice('1d10');
    const mod = (race.name.includes('dwarf') || race.name.includes('elf')) ? -2 : 0;
    switch (true) {
      case r < 3: return 0;
      case r < 5: return Math.max(0, Random.dice('1d3') + mod);
      case r < 7: return Math.max(0, Random.dice('1d4') + mod);
      case r < 9: return Math.max(0, Random.dice('1d6') + 1 + mod);
      case r < 11: return Math.max(0, Random.dice('1d8') + 2 + mod);
    }
  }

  static lifestyle(): Lifestyle {
    const r = Random.dice('3d6');
    switch (true) {
      case r < 4: return { name: 'Wretched', modifier: -40 };
      case r < 6: return { name: 'Squalid', modifier: -20 };
      case r < 9: return { name: 'Poor', modifier: -10 };
      case r < 13: return { name: 'Modest', modifier: 0 };
      case r < 16: return { name: 'Comfortable', modifier: +10 };
      case r < 18: return { name: 'Wealthy', modifier: +20 };
      case r < 19: return { name: 'Aristocratic', modifier: +40 };
    }
  }

  static raisedBy(knewParents): RaisedBy {
    const r = Random.percent();
    if (knewParents) {
      switch (true) {
        case r < 2: return { name: 'nobody', absent: ['mother', 'father'] };
        case r < 3: return { name: 'an institution, such as an asylum', absent: ['mother', 'father'] };
        case r < 4: return { name: 'a temple', absent: ['mother', 'father'] };
        case r < 6: return { name: 'an orphanage', absent: ['mother', 'father'] };
        case r < 8: return { name: 'a guardian', absent: ['mother', 'father'] };
        case r < 16: return {
          name: 'your paternal or maternal aunt, uncle, or both; or extended family such as a tribe or clan',
          absent: ['mother', 'father']
        };
        case r < 26: return { name: 'your paternal or maternal grandparent(s)', absent: ['mother', 'father'] };
        case r < 36: return { name: 'your adoptive family (same or different race)', absent: ['mother', 'father'] };
        case r < 56: return { name: 'your single father or step father', absent: ['mother'] };
        case r < 76: return { name: 'your single mother or step mother', absent: ['father'] };
        case r < 101: return { name: 'your mother and father', absent: [] };
      }
    } else {
      switch (true) {
        case r < 6: return { name: 'nobody', absent: ['mother', 'father'] };
        case r < 11: return { name: 'an institution, such as an asylum', absent: ['mother', 'father'] };
        case r < 16: return { name: 'a temple', absent: ['mother', 'father'] };
        case r < 21: return { name: 'an orphanage', absent: ['mother', 'father'] };
        case r < 31: return { name: 'a guardian', absent: ['mother', 'father'] };
        case r < 51: return {
          name: 'your paternal or maternal aunt, uncle, or both; or extended family such as a tribe or clan',
          absent: ['mother', 'father']
        };
        case r < 81: return { name: 'your paternal or maternal grandparent(s)', absent: ['mother', 'father'] };
        case r < 101: return { name: 'your adoptive family (same or different race)', absent: ['mother', 'father'] };
      }
    }
  }

  static home(lifestyle: Lifestyle): string {
    const r = Random.percent() + lifestyle.modifier;
    switch (true) {
      case r < 1: return 'on the streets';
      case r < 21: return 'in a rundown shack';
      case r < 31: return 'in lots of places, never staying still for long';
      case r < 41: return 'in an encampment or village in the wilderness';
      case r < 51: return 'in an apartment in a rundown neighbourhood';
      case r < 71: return 'in a small house';
      case r < 91: return 'in a large house';
      case r < 111: return 'in a mansion';
      default: return 'in a palace or castle';
    }
  }
}
