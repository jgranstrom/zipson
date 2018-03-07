(function() {
  var editor = ace.edit("demo-editor");
  var output = document.getElementById('demo-output');
  var select = document.getElementById('demo-select');
  var time = document.getElementById('demo-time');
  var saved = document.getElementById('demo-saved');
  var indicate = document.getElementById('demo-indicate');
  var invalid = document.getElementById('demo-error');
  editor.setTheme("ace/theme/github");
  editor.session.setMode("ace/mode/json");
  editor.session.setTabSize(2);

  var getTime = performance && typeof performance.now === 'function' ? performance.now.bind(performance) : Date.now.bind(Date);

  var exampleIndex = 0;
  var examples = [
    {
      title: "A bunch of different numbers",
      data: `[
  1, 15, 10000, 324, 543, 231, 674,
  4545235, 45635 ,451, 456456, 76454,
  42, 543, 56, 0, -234, 656, 2, 4
]`,
    },
    {
      title: "Even more numbers",
      data: `[
  1, 15, 10000, 324, 543, 231, 674,
  4545235, 45635, 451, 456456, 76454,
  42, 543, 56, 0, -234, 656, 2, 4,
  4545235, 45635, 451, 456456, 76454,
  42, 234, 654, 234, 654, 4545235,
  45635, 451, 456456, 76454, 42, 123
]`,
    },
    {
      title: "A lot of repeating numbers",
      data: `[
  1000, 1000, 1000, 1000, 1000, 1000,
  1000, 500, 123000, 123000, 123000,
  123000, 431, 134, 431, 431, 431, 431,
  53, 431, 431, 500000, 50000, 50000,
  50000, 533333, 53, 533333, 533333,
  533333, 533333, 533333, 533333
]`,
    },
    {
      title: 'The classic colors and ratings list',
      data: `[
  { "color": "red", "rating": 3 },
  { "color": "blue", "rating": 9 },
  { "color": "green", "rating": 0 },
  { "color": "red", "rating": 4 },
  { "color": "red", "rating": 4 },
  { "color": "green", "rating": 3 },
  { "color": "red", "rating": 8 },
  { "color": "blue", "rating": 7 },
  { "color": "green", "rating": 3 },
  { "color": "yellow", "rating": 2 },
  { "color": "red", "rating": 3 },
  { "color": "green", "rating": 0 },
  { "color": "green", "rating": 0 },
  { "color": "yellow", "rating": 4 },
  { "color": "green", "rating": 9 },
  { "color": "blue", "rating": 10 },
  { "color": "green", "rating": 1 },
  { "color": "red", "rating": 2 }
]
`
    },
    {
      title: 'Some conversation data',
      data: `{
  "users": [
    { "id": 21455234, "name": "John" },
    { "id": 54324543, "name": "Peter" },
    { "id": 23416435, "name": "Caroline" },
    { "id": 12454352, "name": "Carla" },
    { "id": 87543445, "name": "Mike" }
  ],
  "messages": [
    {
      "id": 1,
      "sent_at": "2018-02-01T00:00:00Z",
      "from_user_id": 21455234,
      "to_user_id": 54324543,
      "text": "How about pizza?"
    },
    {
      "id": 2,
      "sent_at": "2018-02-01T10:00:00Z",
      "from_user_id": 54324543,
      "to_user_id": 21455234,
      "text": "Sounds great"
    },
    {
      "id": 3,
      "sent_at": "2018-02-02T03:00:00Z",
      "from_user_id": 12454352,
      "to_user_id": 87543445,
      "text": "Where's the dog?"
    },
    {
      "id": 4,
      "sent_at": "2018-02-02T18:00:00Z",
      "from_user_id": 23416435,
      "to_user_id": 21455234,
      "text": "How's it going?"
    }
  ]
}`
    },
    {
      title: 'Some complex repeated data for some reason',
      data: `[
  { "x": [ { "y": [100, "hello", { "z": 5432 }]}]},
  { "x": [ { "y": [100, "hello", { "z": 5432 }]}]},
  { "x": [ { "y": [100, "hello", { "z": 5432 }]}]},
  { "x": [ { "y": [100, "hello", { "z": 5432 }]}]},
  { "x": [ { "y": [100, "hello", { "z": 5432 }]}]},
  { "x": [ { "y": [100, "hello", { "z": 5432 }]}]},
  { "x": [ { "y": [100, "hello", { "z": 5432 }]}]},
  { "x": [ { "y": [100, "hello", { "z": 5432 }]}]},
  { "x": [ { "y": [100, "hello", { "z": 5432 }]}]},
  { "x": [ { "y": [100, "hello", { "z": 5432 }]}]},
  { "x": [ { "y": [100, "hello", { "z": 5432 }]}]},
  { "x": [ { "y": [100, "hello", { "z": 5432 }]}]},
  { "x": [ { "y": [100, "hello", { "z": 5432 }]}]},
  { "x": [ { "y": [100, "hello", { "z": 5432 }]}]},
  { "x": [ { "y": [100, "hello", { "z": 5432 }]}]},
  { "x": [ { "y": [100, "hello", { "z": 5432 }]}]},
  { "x": [ { "y": [100, "hello", { "z": 5432 }]}]},
  { "x": [ { "y": [100, "hello", { "z": 5432 }]}]},
  { "x": [ { "y": [100, "hello", { "z": 5432 }]}]},
  { "x": [ { "y": [100, "hello", { "z": 5432 }]}]},
  { "x": [ { "y": [100, "hello", { "z": 5432 }]}]}
]`
    },
    {
      title: "A series of dates",
      data: `[
  "2018-01-01T00:00:00Z",
  "2018-01-02T00:00:00Z",
  "2018-01-03T00:00:00Z",
  "2018-01-04T00:00:00Z",
  "2018-01-05T00:00:00Z",
  "2018-02-06T00:00:00Z",
  "2018-02-07T00:00:00Z",
  "2018-02-08T00:00:00Z",
  "2018-02-09T00:00:00Z",
  "2018-02-10T00:00:00Z",
  "2018-02-11T00:00:00Z",
  "2018-01-12T00:00:00Z",
  "2018-01-13T00:00:00Z",
  "2018-01-14T00:00:00Z",
  "2018-01-15T00:00:00Z",
  "2018-03-16T00:00:00Z",
  "2018-03-17T00:00:00Z",
  "2018-03-18T00:00:00Z",
  "2018-03-19T00:00:00Z",
  "2018-03-20T00:00:00Z"
  ]`
    },
    {
      title: 'Some key-value lists of things',
      data: `{
  "a": {
    "title": "The A list",
    "list": [1, 2, 3, 4, 5]
  },
  "b": {
    "title": "The B list",
    "list": [true, false, true, false, true]
  },
  "c": {
    "title": "The C list",
    "list": [21, 22, "hey", 24, 25, 26, 27]
  },
  "d": {
    "title": "The D list",
    "list": [22, 23, 24, 25, 26, 27, 28.123]
  },
  "e": {
    "title": "The E list",
    "list": [31, 32, 33, 34, 35, 36, 37, 38, 39]
  }
}`
    },
    {
      title: 'All the relations',
      data: `[
  {
    "user": {
      "id": 1,
      "name": "John",
      "image": {
        "url": "john.png",
        "size": { "width": 100, "height": 80 }
      }
    },
    "car": {
      "color": "red",
      "year": 2011,
      "owner": {
        "user": {
          "id": 1,
          "name": "John",
          "image": {
            "url": "john.png",
            "size": { "width": 100, "height": 80 }
          }
        }
      }
    }
  },
  {
    "user": {
      "id": 2,
      "name": "Mark",
      "image": {
        "url": "mark.png",
        "size": { "width": 100, "height": 80 }
      }
    },
    "car": {
      "color": "blue",
      "year": 2014,
      "owner": {
        "user": {
          "id": 2,
          "name": "Mark",
          "image": {
            "url": "mark.png",
            "size": { "width": 100, "height": 80 }
          }
        }
      }
    }
  }
]`
    }
  ]

  zipson.stringify([]);
  JSON.stringify([]);

  examples.forEach((e, idx) => {
    e.option = document.createElement('option');
    e.option.innerHTML = (idx + 1) + '. ' + e.title;
    e.option.setAttribute('value', idx);
    select.appendChild(e.option);
  });

  function showExample(index) {
    editor.session.setValue(examples[index].data);
    select.value = examples[index].option.value;
  }

  var rotateInterval = setInterval(function() {
    indicate.classList.add('active');
    showExample(exampleIndex++);
    setTimeout(() => {
      indicate.classList.remove('active');
    }, 1000);
    if(exampleIndex >= examples.length) { exampleIndex = 0; }
  }, 2000);

  editor.session.on('change', function() {
    var value = editor.session.getValue();
    if(value.length === 0) {
      output.innerHTML = '';
    } else {
      try {
        var parsed = JSON.parse(value);
        output.classList.remove('invalid');
        invalid.classList.remove('active');
        var timeBefore = getTime();
        var zipsonStringified = zipson.stringify(parsed, { detectUtcTimestamps: true });
        output.innerHTML = zipsonStringified;
        var timeTaken = Math.round(1000 * (getTime() - timeBefore)) / 1000;
        time.innerHTML = timeTaken + ' ms';

        var stringified = JSON.stringify(parsed);
        var reducedSize = (stringified.length - zipsonStringified.length) / stringified.length;
        saved.innerHTML = Math.max(0, (100 * reducedSize).toFixed(0)) + '%'
      } catch(e) {
        if(!(e instanceof SyntaxError)) {
          console.error(e);
        } else {
          invalid.classList.add('active');
          output.classList.add('invalid');
        }
      }
    }
  });

  editor.on('focus', function() {
    clearInterval(rotateInterval);
  });

  select.onfocus = function() {
    clearInterval(rotateInterval);
  }

  select.onchange = function() {
    showExample(select.value);
  }

  showExample(exampleIndex++);
})();