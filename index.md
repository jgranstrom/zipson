---
demo: true
---

Input your own JSON and try it out!

# What is this?
Zipson is a drop-in alternative to `JSON.parse/stringify` with added compression and streaming support.

Check out zipson on [github](https://github.com/jgranstrom/zipson) for more details.

### Quick start

```
npm install zipson
```

```javascript
import { stringify, parse } from 'zipson';
parse(stringify(data));
```

#### Features

- Efficient compression with a convenient API
- Zero configuration drop-in replacement for `JSON.stringify` and `JSON.parse`
- Zero dependencies
- Detection of recurring patterns in recursive structures
- Automatic reduction of floating point precision unless you actually need those fine `10^-xx` decimals
- Optional detection and compression of UTC timestamps in strings
- Stream support with the companion lib [zipson-stream](https://github.com/jgranstrom/zipson-stream)
- Support for browser and node
