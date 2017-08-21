## Documentation

You can see below the API reference of this module.

### `Describe(message, fn)`
Creates a new `Describe` instance.

To change the default configuration, you can override the `tester` fields:

```js
let tester = require("tester")
```

#### Colors

`tester` uses [`color-it`](https://github.com/IonicaBizau/node-color-it)
to color the messages. You can use any available color name (defaults are listed):

 - `colors` (Object):
   - `it` (Object)
     - `success`: `"green"`
     - `error`: `"red"`
   - `describe`: `"yellow"`

For example, to have [**blue**](#) describe messages, you will do: `tester.colors.describe = "blue"`.

#### Icons

`tester` uses emoji provided by [`emojic`](https://github.com/IonicaBizau/emojic):

  - `icons`
    - `it`
      - `success`: `"zap"`
      - `error`: `"x"`
    - `describe`: `"arrowRight"`

#### Indent

`tester` uses [`indento`](https://github.com/IonicaBizau/indento) to indent the strings:

 - `indent`
   - `it`: `5`
   - `describe`: `2`

#### Loggers

You can override any of the following fields

 - `loggers`
   - `stream`: The stream where the messages will be written (default: `process.stdout`).
   - `it (err, itMessage, icon)`
   - `describe (message)`

#### Params

- **String** `message`: The `Describe` message.
- **Function** `fn`: The callback function.

### `run(fn)`
Runs the tests from this group.

#### Params

- **Function** `fn`: The callback function.

### `expect()`
This is a wrapper around the `expect` package.

#### Return
- **Expect** The `Expect` result.

### `it(what, fn)`
Adds a new test in the describe queue.

#### Params

- **String** `what`: The test message.
- **Function** `fn`: The callback function.

### `should(what, fn)`
Adds a new test in the describe queue prefixing the message with *should*.

#### Params

- **String** `what`: The test message.
- **Function** `fn`: The callback function.

### `describe(what, fn)`
Groups more tests together.

#### Params

- **String** `what`: The describe message.
- **Function** `fn`: The callback function.

