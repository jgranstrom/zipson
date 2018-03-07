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
- Detect and reuse recurring patterns in recursive structures
- Automatically reduce floating point precision unless you need those fine `10^-xx` decimals
- Optionally detect and heavily compress UTC timestamps in strings
- Supports streams with the companion lib [zipson-stream](https://github.com/jgranstrom/zipson-stream)
- Use it in the browser and on the server
