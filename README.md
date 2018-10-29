# TIYL (This Is Your Life) [![NPM version](https://badge.fury.io/js/tiyl.svg)](http://badge.fury.io/js/tiyl)

[See an interface for this running here](https://tiyl.twolfe.co.uk)

A TypeScript library for generating characters based on the tables presented in the This Is Your Life chapter of Xanathar's Guide To Everything for 5th edition Dungeons &amp; Dragons.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

```batchfile
npm install --save tiyl
```

### Usage

#### Basic Usage

At its simplest, the dice roller is very simple to use. Take the following example:

```typescript
import { Generator } from "tiyl";

const generator = new Generator();
const character = generator.generate();
console.log(character); // Outputs the randomly generated character.
```

#### Configuration

## Installing Dependencies

Installing the dependencies is done using a standard ```npm i```.

## Running the Tests

```dice
npm run test
```

## Building the project

```dice
npm run build
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/trwolfe13/dice-typescript/tags).

## Authors

* **Tom Wolfe** - *Initial work* - [trwolfe13](https://github.com/trwolfe13)

See also the list of [contributors](https://github.com/trwolfe13/tiyl/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
