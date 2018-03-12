# <span><img src="https://cdn.rawgit.com/jgranstrom/zipson/master/docs/icon.svg" width="30" height="30">&nbsp;zipson</span>

[![Build Status](https://travis-ci.org/jgranstrom/zipson.svg?branch=master&style=flat)](https://travis-ci.org/jgranstrom/zipson)
[![npm version](https://badge.fury.io/js/zipson.svg)](http://badge.fury.io/js/zipson)
[![devDependencies Status](https://david-dm.org/jgranstrom/zipson/dev-status.svg)](https://david-dm.org/jgranstrom/zipson?type=dev)

Zipson is a drop-in alternative to JSON.parse/stringify with added compression and streaming support.

![demo](/docs/demo.gif?raw=true)

Try the [online demo](https://jgranstrom.github.io/zipson/)

---

- [Installing](#installing)
- [API](#api)
  - [`stringify(data, options?)`](#stringifydata-options)
  - [`stringifyTo(data, writer, options?)`](#stringifytodata-writer-options)
  - [`parse(string)`](#parsestring)
  - [`parseIncremental()`](#parseincremental)
- [Options](#options)
  - [`detectUtcTimestamps`](#detectutctimestamps)
  - [`fullPrecisionFloats`](#fullprecisionfloats)
- [Writer](#writer)
- [Features](#features)
- [Running the tests](#running-the-tests)
- [Contributing](#contributing)
- [Versioning](#versioning)
- [License](#license)

### Installing

As an npm module

`npm install --save zipson`

Or alternatively from `jsdelivr` with a script tag as a UMD bundle

`<script src="https://cdn.jsdelivr.net/npm/zipson@latest/dist/zipson.min.js"></script>`

### API

##### `stringify(data, options?)`

Stringify data to a zipson string

```javascript
import { stringify } from 'zipson';

const myData = [1, 2, 3, 4 ,5];
const stringified = stringify(myData, options);
```

##### `stringifyTo(data, writer, options?)`

Stringify data to a specific zipson writer

```javascript
import { stringifyTo, ZipsonStringWriter } from 'zipson';

const writer = new ZipsonStringWriter();
const myData = [1, 2, 3, 4, 5];
stringifyTo(myData, writer, options);
const stringified = writer.value;
```

##### `parse(string)`

Parse a zipson string

```javascript
import { parse } from 'zipson';

const myStringifiedData = '.......';
const parsed = parse(myStringifiedData);
```

##### `parseIncremental()`

Incrementally parse a zipson string. Call the returned function once for each chunk of the string, calling it with null will signal end of string and returned the parsed result.

```javascript
import { parseIncremental } from 'zipson';

const increment = parseIncremental();
increment(chunkOfStringifiedData1);
increment(chunkOfStringifiedData2);
increment(chunkOfStringifiedData3);
increment(chunkOfStringifiedData4);
const parsed = increment(null);
```

### Options

Compression options can be provided to the stringify functions. Parse however does not take any options since it is not dependent on knowing with what options the string was compressed.

##### `detectUtcTimestamps`

Set to true to tell zipson to detect timestamps within strings such as `'2018-01-01T00:00:00Z'` in order to represent them more efficiently.

##### `fullPrecisionFloats`

By default floating point precision is reduced to `10^-3`, set this to true in order to retain full floating point precision.

### Writer

Compression output is generalized to a writer class in order to support different output targets. Custom writers have to implement the following API.

```typescript
abstract class ZipsonWriter {

  // Write a chunk of data
  abstract write(data: string): void;

  // End of writes
  abstract end(): void;
}
```

### Features
* Efficient compression with a convenient API
* Zero configuration drop-in replacement for JSON.stringify and JSON.parse
* Zero dependencies
* Detection of recurring patterns in recursive structures
* Automatic reduction of floating point precision unless you actually need those fine 10^-xx decimals
* Optional detection and compression of UTC timestamps in strings
* Stream support with the companion lib [zipson-stream](https://github.com/jgranstrom/zipson-stream)
* Support for browser and node

### Running the tests

```npm test```

For running tests in watch mode while developing:

```npm run testw```

### Contributing

Pull requests are welcome. Please see the [conventional commits](https://conventionalcommits.org/) guidelines for commit message formatting.

### Versioning

This project is versioned using [SemVer](http://semver.org/) See [tags](https://github.com/jgranstrom/zipson/tags) and [CHANGELOG.md](CHANGELOG.md) for version details.

### License

This project is licensed under the MIT License - see [LICENSE.md](LICENSE.md) file for details
