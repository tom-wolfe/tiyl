import { Alignment, Alignments } from './alignment';
import { Backgrounds, Background } from './background';
import { Birth } from './birth';
import { Classes, Class } from './class';
import { Family, Lifestyle, Parents, RaisedBy, Sibling } from './family';
import { Items } from './item';
import { Life } from './life';
import { Races, Race, Subrace } from './race';

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
  class: CharacterClass;
  trinket: string;
  race: CharacterRace;
  alignment: string;
  background: CharacterBackground;
  family: CharacterFamily;
  events: string[];
}

export interface CharacterFamily {
  knewParents: boolean;
  parents: Parents;
  birthplace: string;
  raisedBy: RaisedBy;
  lifestyle: Lifestyle;
  home: string;
  childhood: string;
  siblings: Sibling[];
}

export interface CharacterRace {
  name: string;
  subrace: string;
  other: { name: string, value: string }[];
}

export interface CharacterClass {
  name: string;
  reason: string;
  other: { name: string, value: string }[];
}

export interface CharacterBackground {
  name: string;
  reason: string;
  traits: string[];
  ideal: string;
  bond: string;
  flaw: string;
  other: { name: string, value: string }[];
}

export class Generator {
  private alignment: Alignment;
  private background: Background;
  private class: Class;
  private race: Race;
  private subrace: Subrace;
  private sourceList: string[];

  constructor(private config: Config) {
    if (!this.config) {
      this.config = {
        age: null,
        alignment: null,
        background: null,
        class: null,
        race: null,
        subrace: null,
        sources: null,
        charismaModifier: null
      };
    }
  }

  private assignSources() {
    if (this.config.sources) {
      this.sourceList = this.config.sources.split(',').map(s => s.trim());
    } else {
      this.sourceList = ['PHB', 'VGM', 'XGE'];
    }
  }

  private assignRace(character: Character) {
    if (this.config.race) {
      this.race = Races.byName(this.config.race);
    } else {
      this.race = Races.random(this.sourceList);
    }

    if (this.race.subraces.length > 0) {
      if (this.config.subrace) {
        this.subrace = this.race.subraces.filter(sr => sr.name === this.config.subrace)[0];
      } else {
        this.subrace = Races.randomSubrace(this.race);
      }
    }

    character.race = {
      name: this.race.name,
      subrace: this.subrace ? this.subrace.name : undefined,
      other: Races.other(this.race, this.subrace)
    };
  }

  private assignAlignment(character: Character) {
    if (this.config.alignment) {
      this.alignment = Alignments.byAbbreviation(this.config.alignment);
    } else {
      this.alignment = Alignments.random();
    }
    character.alignment = this.alignment.name;
  }

  private assignAge(character: Character) {
    if (this.config.age) {
      character.age = this.config.age;
    } else {
      character.age = Life.age();
    }
  }

  private assignBackground(character: Character) {
    if (this.config.background) {
      this.background = Backgrounds.byName(this.config.background);
    } else {
      this.background = Backgrounds.random(this.sourceList);
    }
    character.background = {
      name: this.background.name,
      reason: Backgrounds.reason(this.background),
      traits: Backgrounds.traits(this.background),
      ideal: Backgrounds.ideal(this.background, this.alignment).ideal,
      bond: Backgrounds.bond(this.background),
      flaw: Backgrounds.flaw(this.background),
      other: Backgrounds.other(this.background)
    };
  }

  private assignClass(character: Character) {
    if (this.config.class) {
      this.class = Classes.byName(this.config.class);
    } else {
      this.class = Classes.random(this.sourceList);
    }
    character.class = {
      name: this.class.name,
      reason: Classes.reason(this.class),
      other: Classes.other(this.class)
    };
  }

  private assignFamily(character: Character) {
    const knewParents = Family.knewParents();
    const lifestyle = Family.lifestyle();
    const raisedBy = Family.raisedBy(knewParents);
    character.family = {
      knewParents,
      raisedBy,
      lifestyle,
      birthplace: Birth.place(),
      home: Family.home(lifestyle),
      childhood: Life.childhood(this.config.charismaModifier || 0),
      parents: Family.parents(this.race, this.subrace),
      siblings: []
    };
    character.family.parents.mother.occupation = Life.occupation();
    character.family.parents.father.occupation = Life.occupation();
    if (raisedBy.absent.includes('mother')) {
      character.family.parents.mother.absent = Family.absentParent();
    }
    if (raisedBy.absent.includes('father')) {
      character.family.parents.father.absent = Family.absentParent();
    }
  }

  private assignSiblings(character: Character) {
    for (let n = 0; n < Family.siblings(this.race); n++) {
      character.family.siblings.push({
        relativeAge: Life.relativeAge(),
        relationship: Family.siblingSex(),
        occupation: Life.occupation(),
        status: Life.status(),
        attitude: Life.relationship()
      });
    }
  }

  private assignEvents(character: Character) {
    character.events = [];
    const eventRolls = [];
    for (let n = 0; n < Life.eventCount(character.age); n++) {
      character.events.push(Life.event(eventRolls));
    }
  }

  private assignTrinket(character: Character) {
    character.trinket = Items.trinket();
  }

  generate(): Character {
    const character: Character = Object.assign({});
    this.assignSources();
    this.assignRace(character);
    this.assignAlignment(character);
    this.assignAge(character);
    this.assignBackground(character);
    this.assignClass(character);
    this.assignFamily(character);
    this.assignSiblings(character);
    this.assignEvents(character);
    this.assignTrinket(character);
    return character;
  }
}
