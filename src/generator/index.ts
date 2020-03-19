import { Alignment, Alignments } from './alignment';
import { Background, Backgrounds } from './background';
import { Birth } from './birth';
import { Class, Classes } from './class';
import { Family, Lifestyle, Parents, RaisedBy, Sibling } from './family';
import { Items } from './item';
import { Life } from './life';
import { Names } from './name';
import { Race, Races, Subrace } from './race';

export * from './name';

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
  name: string;
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

export interface GenerateState {
  alignment: Alignment;
  background: Background;
  class: Class;
  race: Race;
  subrace: Subrace;
  character: Character;
}

export class Generator {
  private sourceList: string[];

  constructor(private config?: Config) {
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
    this.assignSources();
  }

  private assignSources() {
    if (this.config.sources) {
      this.sourceList = this.config.sources.split(',').map(s => s.trim());
    } else {
      this.sourceList = ['PHB', 'VGM', 'XGE'];
    }
  }

  private assignRace(state: GenerateState) {
    if (this.config.race) {
      state.race = Races.byName(this.config.race);
    } else {
      state.race = Races.random(this.sourceList);
    }

    if (state.race.subraces.length > 0) {
      if (this.config.subrace) {
        state.subrace = state.race.subraces.filter(sr => sr.name === this.config.subrace)[0];
      } else {
        state.subrace = Races.randomSubrace(state.race);
      }
    }

    state.character.race = {
      name: state.race.name,
      subrace: state.subrace ? state.subrace.name : undefined,
      other: Races.other(state.race, state.subrace)
    };
  }

  private assignName(state: GenerateState) {
    const name = Names.byRace(state.subrace ? state.subrace.name : state.race.name);
    state.character.name = (name || '').replace(/\b\w/g, n => n.toUpperCase());
  }

  private assignAlignment(state: GenerateState) {
    if (this.config.alignment) {
      state.alignment = Alignments.byAbbreviation(this.config.alignment);
    } else {
      state.alignment = Alignments.random();
    }
    state.character.alignment = state.alignment.name;
  }

  private assignAge(state: GenerateState) {
    if (this.config.age) {
      state.character.age = this.config.age;
    } else {
      state.character.age = Life.age();
    }
  }

  private assignBackground(state: GenerateState) {
    if (this.config.background) {
      state.background = Backgrounds.byName(this.config.background);
    } else {
      state.background = Backgrounds.random(this.sourceList);
    }
    state.character.background = {
      name: state.background.name,
      reason: Backgrounds.reason(state.background),
      traits: Backgrounds.traits(state.background),
      ideal: Backgrounds.ideal(state.background, state.alignment).ideal,
      bond: Backgrounds.bond(state.background),
      flaw: Backgrounds.flaw(state.background),
      other: Backgrounds.other(state.background)
    };
  }

  private assignClass(state: GenerateState) {
    if (this.config.class) {
      state.class = Classes.byName(this.config.class);
    } else {
      state.class = Classes.random(this.sourceList);
    }
    state.character.class = {
      name: state.class.name,
      reason: Classes.reason(state.class),
      other: Classes.other(state.class)
    };
  }

  private assignFamily(state: GenerateState) {
    const knewParents = Family.knewParents();
    const lifestyle = Family.lifestyle();
    const raisedBy = Family.raisedBy(knewParents);
    state.character.family = {
      knewParents,
      raisedBy,
      lifestyle,
      birthplace: Birth.place(),
      home: Family.home(lifestyle),
      childhood: Life.childhood(this.config.charismaModifier || 0),
      parents: Family.parents(state.race, state.subrace),
      siblings: []
    };
    state.character.family.parents.mother.occupation = Life.occupation();
    state.character.family.parents.father.occupation = Life.occupation();
    if (raisedBy.absent.includes('mother')) {
      state.character.family.parents.mother.absent = Family.absentParent();
    }
    if (raisedBy.absent.includes('father')) {
      state.character.family.parents.father.absent = Family.absentParent();
    }
  }

  private assignSiblings(state: GenerateState) {
    for (let n = 0; n < Family.siblings(state.race); n++) {
      state.character.family.siblings.push({
        relativeAge: Life.relativeAge(),
        relationship: Family.siblingSex(),
        occupation: Life.occupation(),
        status: Life.status(),
        attitude: Life.relationship()
      });
    }
  }

  private assignEvents(state: GenerateState) {
    state.character.events = [];
    const eventRolls = [];
    for (let n = 0; n < Life.eventCount(state.character.age); n++) {
      state.character.events.push(Life.event(eventRolls));
    }
  }

  private assignTrinket(state: GenerateState) {
    state.character.trinket = Items.trinket();
  }

  generate(): Character {
    const state: GenerateState = {
      alignment: undefined,
      background: undefined,
      character: <Character>{},
      class: undefined,
      race: undefined,
      subrace: undefined
    };
    this.assignRace(state);
    this.assignName(state);
    this.assignAlignment(state);
    this.assignAge(state);
    this.assignBackground(state);
    this.assignClass(state);
    this.assignFamily(state);
    this.assignSiblings(state);
    this.assignEvents(state);
    this.assignTrinket(state);

    return state.character;
  }
}
