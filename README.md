
# tester

 [![Support me on Patreon][badge_patreon]][patreon] [![Buy me a book][badge_amazon]][amazon] [![PayPal][badge_paypal_donate]][paypal-donations] [![Version](https://img.shields.io/npm/v/tester.svg)](https://www.npmjs.com/package/tester) [![Downloads](https://img.shields.io/npm/dt/tester.svg)](https://www.npmjs.com/package/tester)

> Unit testing made simple and fun: flat colors and emoji in your tests.

## :star: Features

 - It does *not* create any globals.
 - Writing messages in custom streams (by default in `process.stdout`).
 - Easy interface for handling sync and async stuff.
 - Emoji & Flat colors :art:
 - Just run the test file using `node`

## Tip :bulb:
Use the [`tester-init`](https://github.com/IonicaBizau/tester-init) to init the test file.

[![tester](http://i.imgur.com/WzLYt7t.png)](#)

## :cloud: Installation

```sh
$ npm i --save-dev tester
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


## :clipboard: Example



```js
const tester = require("tester");

// Use describe to group the tests
tester.describe("Running some example tests", example => {

    // Without a callback (the code will be executed syncronously)
    example.should("be able to make simple checks using expect", () => {
        example.expect(true).toBe(true);
    });

    // Async function which will fail
    example.should("support async functions", (cb) => {
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

## :question: Get Help

There are few ways to get help:

 1. Please [post questions on Stack Overflow](https://stackoverflow.com/questions/ask). You can open issues with questions, as long you add a link to your Stack Overflow question.
 2. For bug reports and feature requests, open issues. :bug:
 3. For direct and quick help from me, you can [use Codementor](https://www.codementor.io/johnnyb). :rocket:


## :memo: Documentation


### `Describe(message, fn)`
Creates a new `Describe` instance.

To change the default configuration, you can override the `tester` fields:

```js
let tester = require("tester");
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



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].


## :sparkling_heart: Support my projects

I open-source almost everything I can, and I try to reply everyone needing help using these projects. Obviously,
this takes time. You can integrate and use these projects in your applications *for free*! You can even change the source code and redistribute (even resell it).

However, if you get some profit from this or just want to encourage me to continue creating stuff, there are few ways you can do it:

 - Starring and sharing the projects you like :rocket:
 - [![PayPal][badge_paypal]][paypal-donations]—You can make one-time donations via PayPal. I'll probably buy a ~~coffee~~ tea. :tea:
 - [![Support me on Patreon][badge_patreon]][patreon]—Set up a recurring monthly donation and you will get interesting news about what I'm doing (things that I don't share with everyone).
 - **Bitcoin**—You can send me bitcoins at this address (or scanning the code below): `1P9BRsmazNQcuyTxEqveUsnf5CERdq35V6`

    ![](https://i.imgur.com/z6OQI95.png)

Thanks! :heart:



## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[badge_patreon]: http://ionicabizau.github.io/badges/patreon.svg
[badge_amazon]: http://ionicabizau.github.io/badges/amazon.svg
[badge_paypal]: http://ionicabizau.github.io/badges/paypal.svg
[badge_paypal_donate]: http://ionicabizau.github.io/badges/paypal_donate.svg
[patreon]: https://www.patreon.com/ionicabizau
[amazon]: http://amzn.eu/hRo9sIZ
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(https%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: https://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
