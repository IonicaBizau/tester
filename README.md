# tester [![Support this project][donate-now]][paypal-donations]

Unit testing made simple and fun.

[![tester](http://i.imgur.com/WzLYt7t.png)](#)

## Installation

```sh
$ npm i --save tester
```

After installing the package, you just need to set up a test file where you `require` the `tester` package. Your `package.json` will look like this:

```js
{
  "name": "tester",
  ...
  "scripts": {
    "test": "node test/your-test-file.js"
  },
  ...
  "devDependencies": {
    "tester": "^1.0.0"
  }
}
```

`test/your-test-file.js` will contain your tests, like documented below.

## Example

```js
const tester = require("../");

// Use describe to group the tests
tester.describe("Running some example tests", example => {

    // Without a callback (the code will be executed syncronously)
    example.it("should be able to make simple checks using expect", () => {
        example.expect(true).toBe(true);
    });

    // Async function which will fail
    example.it("should support async functions", (cb) => {
        setTimeout(function() {
            example.expect(true).toBe(false);
            cb();
        }, 100);
    });

    // Wait a second and pass
    example.it("wait a second", (cb) => {
        setTimeout(function() {
            example.expect(true).toBe(true);
            cb();
        }, 1000);
    });
});

tester.describe("Running another set of tests", another => {
    another.it("some test", () => {
        another.expect(true).toBe(true);
    });
});
```

## Documentation

### `Describe(message, fn)`
Creates a new `Describe` instance.

To change the default configuration, you can override the `tester` fields:

```js
var tester = require("tester");
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

You can override any of the following functions:

 - `loggers`
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

### `describe(what, fn)`
Groups more tests together.

#### Params
- **String** `what`: The describe message.
- **Function** `fn`: The callback function.

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

## License

[MIT][license] © [Ionică Bizău][website]

[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md