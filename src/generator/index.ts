import { Alignment, Alignments } from './alignment';
import { Background, Backgrounds, Ideal } from './background';
import { Birth } from './birth';
import { Class, Classes } from './class';
import { Family, Lifestyle, Parents, RaisedBy, Sibling } from './family';
import { Items } from './item';
import { Life } from './life';
import { Race, Races, Subrace } from './race';

export interface Config {
  age: number;
  alignment: string;
  background: string;
  class: string;
  race: string;
  subrace: string;
  sources: string;
  charismaModifier: number;
}

export interface Character {
  age: number;
  class: Class;
  trinket: string;
  sources: string[];
  race: Race;
  subrace: Subrace;
  raceOther: { name: string, value: string }[];
  alignment: Alignment;
  background: Background;
  backgroundReason: string;
  backgroundTraits: string[];
  backgroundIdeal: Ideal;
  backgroundBond: string;
  backgroundFlaw: string;
  backgroundOther: { name: string, value: string }[];
  knewParents: boolean;
  classReason: string;
  classOther: { name: string, value: string }[];
  parents: Parents;
  birthplace: string;
  raisedBy: RaisedBy;
  lifestyle: Lifestyle;
  home: string;
  childhood: string;
  siblings: Sibling[];
  events: string[];
}

export class Generator {
  constructor(private config: Config) { }

  sources(character: Character) {
    if (this.config.sources) {
      character.sources = this.config.sources.split(',').map(s => s.trim());
    } else {
      character.sources = ['PHB', 'VGM', 'XGE'];
    }
  }

  race(character: Character) {
    if (this.config.race) {
      character.race = Races.byName(this.config.race);
    } else {
      character.race = Races.random(character.sources);
    }

    if (character.race.subraces.length > 0) {
      if (character.subrace) { character.subrace = character.race.subraces.filter(sr => sr.name === this.config.subrace)[0]; }
      if (!character.subrace) { character.subrace = Races.randomSubrace(character.race); }
    }

    character.raceOther = Races.other(character.race, character.subrace);
  }

  alignment(character: Character) {
    if (this.config.alignment) {
      character.alignment = Alignments.byAbbreviation(character.alignment);
    } else {
      character.alignment = Alignments.random();
    }
  }

  age(character: Character) {
    if (this.config.age) {
      character.age = character.age;
    } else {
      character.age = Life.age();
    }
  }

  background(character: Character) {
    if (this.config.background) {
      character.background = Backgrounds.byName(this.config.background);
    } else {
      character.background = Backgrounds.random(character.sources);
    }
    character.backgroundReason = Backgrounds.reason(character.background);
    character.backgroundTraits = Backgrounds.traits(character.background);
    character.backgroundIdeal = Backgrounds.ideal(character.background, character.alignment);
    character.backgroundBond = Backgrounds.bond(character.background);
    character.backgroundFlaw = Backgrounds.flaw(character.background);
    character.backgroundOther = Backgrounds.other(character.background);
  }

  adventuringClass(character: Character) {
    if (this.config.class) {
      character.class = Classes.byName(this.config.class);
    } else {
      character.class = Classes.random(character.sources);
    }
    character.classReason = Classes.reason(character.class);
    character.classOther = Classes.other(character.class);
  }

  parents(character: Character) {
    character.knewParents = Family.knewParents();
    character.parents = Family.parents(character.race, character.subrace);
    character.parents.mother.occupation = Life.occupation();
    character.parents.father.occupation = Life.occupation();
  }

  upbringing(character: Character) {
    character.birthplace = Birth.place();
    character.raisedBy = Family.raisedBy(character.knewParents);
    character.lifestyle = Family.lifestyle();
    character.home = Family.home(character.lifestyle);
    character.childhood = Life.childhood(this.config.charismaModifier || 0);

    if (character.raisedBy.absent.includes('mother')) {
      character.parents.mother.absent = Family.absentParent();
    }
    if (character.raisedBy.absent.includes('father')) {
      character.parents.father.absent = Family.absentParent();
    }
  }

  siblings(character: Character) {
    character.siblings = [];
    for (let n = 0; n < Family.siblings(character.race); n++) {
      character.siblings.push({
        relativeAge: Life.relativeAge(),
        relationship: Family.siblingSex(),
        occupation: Life.occupation(),
        status: Life.status(),
        attitude: Life.relationship()
      });
    }
  }

  events(character: Character) {
    character.events = [];
    const eventRolls = [];
    for (let n = 0; n < Life.eventCount(character.age); n++) {
      character.events.push(Life.event(eventRolls));
    }
  }

  trinket(character: Character) {
    character.trinket = Items.trinket();
  }

  generator(): Character {
    const character: Character = Object.assign({});
    this.sources(character);
    this.race(character);
    this.alignment(character);
    this.age(character);
    this.background(character);
    this.adventuringClass(character);
    this.parents(character);
    this.siblings(character);
    this.upbringing(character);
    this.events(character);
    this.trinket(character);
    return character;
  }
}
