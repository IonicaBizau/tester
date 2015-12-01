"use strict";

const expect = require("expect")
    , colorIt = require("color-it")
    , emoji = require("emojic")
    , Queue = require("queoid")
    , indento = require("indento")
    , tryAsync = require("try-async");
    ;

class Describe {
    constructor (message, fn) {
        this.queue = new Queue();
        this.message = message;
        this.fn = fn;
    }
    run (fn) {
        tester.loggers.describe(this.message);
        this.fn(this);
        this.queue.start(fn);
    }
     expect () {
        return expect.apply(this, arguments);
    }
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
        it: (err, itMessage, icon) => {
            icon = icon || tester.icons.it[err ?  "error" : "success"];
            var message = emoji[icon] + " " + itMessage;

            if (err) {
                message += "\n" + err;
            }

            console.log(
                indento(
                    colorIt(message)[tester.colors.it[err ? "error" : "success"]]().toString()
                  , tester.indent.it
                )
            );
        }
      , describe: (message) => {
            console.log(
                indento(
                    colorIt(
                        emoji[tester.icons.describe]
                      + " " + message
                    )[tester.colors.describe]().toString()
                  , tester.indent.describe
                )
            );
        }
    }
};

function generateQueueHandler(desc) {
    return function (cb) {
        desc.run(cb);
    }
}
tester.describe = function (what, fn) {
    tester.queue.push(generateQueueHandler(new Describe(what, fn)));
    tester.queue.start();
};
