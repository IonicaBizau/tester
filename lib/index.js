"use strict";

const expect = require("expect")
    , Queue = require("queoid")
    , tryAsync = require("try-async")
    , logger = require("emoji-logger")
    ;

class Describe {

    /**
     * Describe
     * Creates a new `Describe` instance.
     *
     * To change the default configuration, you can override the `tester` fields:
     *
     * ```js
     * var tester = require("tester");
     * ```
     *
     * #### Colors
     *
     * `tester` uses [`color-it`](https://github.com/IonicaBizau/node-color-it)
     * to color the messages. You can use any available color name (defaults are listed):
     *
     *  - `colors` (Object):
     *    - `it` (Object)
     *      - `success`: `"green"`
     *      - `error`: `"red"`
     *    - `describe`: `"yellow"`
     *
     * For example, to have [**blue**](#) describe messages, you will do: `tester.colors.describe = "blue"`.
     *
     * #### Icons
     *
     * `tester` uses emoji provided by [`emojic`](https://github.com/IonicaBizau/emojic):
     *
     *   - `icons`
     *     - `it`
     *       - `success`: `"zap"`
     *       - `error`: `"x"`
     *     - `describe`: `"arrowRight"`
     *
     * #### Indent
     *
     * `tester` uses [`indento`](https://github.com/IonicaBizau/indento) to indent the strings:
     *
     *  - `indent`
     *    - `it`: `5`
     *    - `describe`: `2`
     *
     * #### Loggers
     *
     * You can override any of the following fields
     *
     *  - `loggers`
     *    - `stream`: The stream where the messages will be written (default: `process.stdout`).
     *    - `it (err, itMessage, icon)`
     *    - `describe (message)`
     *
     * @name Describe
     * @function
     * @param {String} message The `Describe` message.
     * @param {Function} fn The callback function.
     */
    constructor (message, fn) {
        this.queue = new Queue();
        this.message = message;
        this.fn = fn;
    }

    /**
     * run
     * Runs the tests from this group.
     *
     * @name run
     * @function
     * @param {Function} fn The callback function.
     */
    run (fn) {
        tester.loggers.describe(this.message);
        this.fn(this);
        this.queue.start(fn);
    }

    /**
     * expect
     * This is a wrapper around the `expect` package.
     *
     * @name expect
     * @function
     * @return {Expect} The `Expect` result.
     */
    expect () {
        return expect.apply(this, arguments);
    }

    /**
     * it
     * Adds a new test in the describe queue.
     *
     * @name it
     * @function
     * @param {String} what The test message.
     * @param {Function} fn The callback function.
     */
    it (what, fn) {

        var _fn = cb => {

            var _this = {
                    ended: false
                  , end: (e, m) => {
                        if (_this.ended) {
                            return;
                        }
                        m = m || what;
                        _this.ended = true;
                        tester.loggers.it(e, m);
                        cb();
                    }
                  , error: (e) => {
                        _this.end(e, what);
                    }
                  , pass: () => {
                        _this.end(null, what);
                    }
                  , expect: expect
                }
              , _err = null
              , _args = []
              ;

            if (fn.length) {
                _args.push(_this.end);
            }

            tryAsync(function () {
                fn.apply(_this, _args);
            }, e => _this.error(e));

            if (!_args.length) {
                _this.end();
            }
        };

        this.queue.push(_fn);
    }

    /**
     * should
     * Adds a new test in the describe queue prefixing the message with *should*.
     *
     * @name should
     * @function
     * @param {String} what The test message.
     * @param {Function} fn The callback function.
     */
    should (what, fn) {
        this.it(`should ${what}`, fn);
    }
}

var tester = module.exports = {
    queue: new Queue()
  , colors: {
        it: {
            success: "green"
          , error: "red"
        }
      , describe: "yellow"
    }
  , icons: {
        it: {
            success: "zap"
          , error: "x"
        }
      , describe: "arrowRight"
    }
  , indent: {
        it: 5
      , describe: 2
    }
  , loggers: {
        stream: process.stdout
      , it: (err, itMessage, icon) => {
            icon = icon || tester.icons.it[err ?  "error" : "success"];

            // Build the message
            var message = itMessage;
            if (err) {
                message += "\n" + err;
            }

            logger.log(message, {
                icon: icon
              , type: "tester:it"
              , indent: tester.indent.it
              , color: tester.colors.it[err ? "error" : "success"]
              , stream: tester.loggers.stream
            });
        }
      , describe: (message) => {
            logger.log(message, {
                icon: tester.icons.describe
              , type: "tester:describe"
              , indent: tester.indent.describe
              , color: tester.colors.describe
              , stream: tester.loggers.stream
            });
        }
    }
};

function generateQueueHandler(desc) {
    return function (cb) {
        desc.run(cb);
    }
}

/**
 * describe
 * Groups more tests together.
 *
 * @name describe
 * @function
 * @param {String} what The describe message.
 * @param {Function} fn The callback function.
 */
tester.describe = function (what, fn) {
    tester.queue.push(generateQueueHandler(new Describe(what, fn)));
    tester.queue.start();
};
