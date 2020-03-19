
import * as AarakocraNames from './aarakocra.json';
import * as AasimarNames from './aasimar.json';
import * as DragonbornNames from './dragonborn.json';
import * as DwarfNames from './dwarf.json';
import * as ElfNames from './elf.json';
import * as AirGenasiNames from './genasi-air.json';
import * as EarthGenasiNames from './genasi-earth.json';
import * as FireGenasiNames from './genasi-fire.json';
import * as WaterGenasiNames from './genasi-water.json';
import * as GnomeNames from './gnome.json';
import * as GoblinNames from './goblin.json';
import * as GoliathNames from './goliath.json';
import * as HalflingNames from './halfling.json';
import * as HumanNames from './human.json';
import * as OrcNames from './human.json';
import * as KenkuNames from './kenku.json';
import * as KoboldNames from './kobold.json';
import * as LizardfolkNames from './lizardfolk.json';
import * as TabaxiNames from './tabaxi.json';
import * as TieflingNames from './tiefling.json';
import * as TritonNames from './triton.json';
import * as YuanTiNames from './yuan-ti.json';

export const NameDefinitions: { [key: string]: any[] } = {
  'Aarakocra': [AarakocraNames],
  'Aasimar': [AasimarNames],
  'Aquatic Half-Elf': [ElfNames],
  'Scourge Aasimar': [AasimarNames],
  'Protector Aasimar': [AasimarNames],
  'Fallen Aasimar': [AasimarNames],
  'Air Genasi': [AirGenasiNames],
  'Bugbear': [GoblinNames],
  'Deep Gnome': [GnomeNames],
  'Dragonborn': [DragonbornNames],
  'Drow Half-Elf': [ElfNames],
  'Duergar': [DwarfNames],
  'Dwarf': [DwarfNames],
  'Eladrin Elf': [ElfNames],
  'Elf': [ElfNames],
  'Earth Genasi': [EarthGenasiNames],
  'Feral Tiefling': [TieflingNames],
  'Firbolg': [ElfNames],
  'Fire Genasi': [FireGenasiNames],
  'Forest Gnome': [GnomeNames],
  'Genasi': [AirGenasiNames, EarthGenasiNames, FireGenasiNames, WaterGenasiNames],
  'Gnome': [GnomeNames],
  'Goblin': [GoblinNames],
  'Goliath': [GoliathNames],
  'Half-Elf': [ElfNames, HumanNames],
  'Half-Orc': [OrcNames, HumanNames],
  'Halfling': [HalflingNames],
  'Hill Dwarf': [DwarfNames],
  'High Elf': [ElfNames],
  'High Half-Elf': [ElfNames],
  'Hobgoblin': [GoblinNames],
  'Human': [HumanNames],
  'Kenku': [KenkuNames],
  'Kobold': [KoboldNames],
  'Light Halfling': [HalflingNames],
  'Lizardfolk': [LizardfolkNames],
  'Mountain Dwarf': [DwarfNames],
  'Orc': [OrcNames],
  'Rock Gnome': [GnomeNames],
  'Stout Halfling': [HalflingNames],
  'Tabaxi': [TabaxiNames],
  'Tiefling': [TieflingNames],
  'Triton': [TritonNames],
  'Water Genasi': [WaterGenasiNames],
  'Wood Elf': [ElfNames],
  'Wood Half-Elf': [ElfNames],
  'Yuan-ti Pureblood': [YuanTiNames]
};
