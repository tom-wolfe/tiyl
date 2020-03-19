import { Config, Generator } from '@tiyl/generator';

describe('Generator', () => {
  describe('generate', () => {
    it('runs without error', () => {
      const config: Config = {
        race: null,
        subrace: null,
        class: null,
        background: null,
        alignment: null,
        age: 0,
        charismaModifier: 4,
        sources: null
      };
      const generator = new Generator(config);
      for (let x = 0; x < 100; x++) {
        generator.generate();
      }
    });
  });
});
